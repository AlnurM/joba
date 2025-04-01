import { FetchOptions, QueueItem } from "./types";

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
      prom.resolve(response);
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

export async function customFetch(
  url: string,
  options: FetchOptions = {},
): Promise<Response> {
  const { skipAuth = false, ...fetchOptions } = options;

  // Если skipAuth=true, делаем обычный fetch без обработки токенов
  if (skipAuth) {
    return fetch(url, fetchOptions);
  }

  try {
    const response = await retryRequest(
      url,
      fetchOptions,
      localStorage.getItem("access_token") || "",
    );

    // Если ответ успешный, возвращаем его
    if (response.ok) {
      return response;
    }

    // Если получили 401 и не обновляем токен
    if (response.status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        // Пытаемся обновить токен
        const refreshResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh_token: localStorage.getItem("refresh_token"),
            }),
          },
        );

        if (!refreshResponse.ok) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          throw new Error("Failed to refresh token");
        }

        const refreshData = await refreshResponse.json();

        // Сохраняем новый токен
        localStorage.setItem("access_token", refreshData.access_token);
        localStorage.setItem("refresh_token", refreshData.refresh_token);

        // Очищаем очередь и повторяем запрос
        await processQueue(refreshData.access_token, url, fetchOptions);
        isRefreshing = false;

        return retryRequest(url, fetchOptions, refreshData.access_token);
      } catch (error) {
        // Если не удалось обновить токен, очищаем очередь с ошибкой
        processQueue("", url, fetchOptions);
        isRefreshing = false;
        throw error;
      }
    }

    // Если получили 401 и уже обновляем токен
    if (response.status === 401 && isRefreshing) {
      // Добавляем запрос в очередь
      return new Promise<Response>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });
    }

    return response;
  } catch (error) {
    throw error;
  }
}
