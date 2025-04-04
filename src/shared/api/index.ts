import { FetchOptions, QueueItem } from "./types";
import { storage } from "@/shared/lib";

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = async (
  token: string,
  url: string,
  options: FetchOptions,
) => {
  for (const prom of failedQueue) {
    try {
      const response = await retryRequest(url, options, token);
      const data = await response.json();
      prom.resolve(data);
    } catch (error) {
      prom.reject(error);
    }
  }
  failedQueue = [];
};

const retryRequest = async (
  url: string,
  options: FetchOptions,
  token: string,
): Promise<Response> => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export async function customFetch<T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> {
  const { skipAuth = false, rawResponse = false, ...fetchOptions } = options;

  if (skipAuth) {
    const response = await fetch(url, fetchOptions);
    return rawResponse ? (response as T) : response.json();
  }

  try {
    const response = await retryRequest(
      url,
      fetchOptions,
      storage.get("access_token") || "",
    );

    if (response.ok) {
      return rawResponse ? (response as T) : response.json();
    }

    if ((response.status === 401 || response.status === 403) && !isRefreshing) {
      isRefreshing = true;

      try {
        const refreshResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh?refresh_token=${storage.get("refresh_token")}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!refreshResponse.ok) {
          storage.remove("access_token");
          storage.remove("refresh_token");
          throw new Error("Failed to refresh token");
        }

        const refreshData = await refreshResponse.json();

        storage.set("access_token", refreshData.access_token);
        storage.set("refresh_token", refreshData.refresh_token);

        await processQueue(refreshData.access_token, url, fetchOptions);
        isRefreshing = false;

        const retryResponse = await retryRequest(
          url,
          fetchOptions,
          refreshData.access_token,
        );
        return rawResponse ? (retryResponse as T) : retryResponse.json();
      } catch (error) {
        processQueue("", url, fetchOptions);
        isRefreshing = false;
        throw error;
      }
    }

    if ((response.status === 401 || response.status === 403) && isRefreshing) {
      return new Promise<T>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    throw error;
  }
}
