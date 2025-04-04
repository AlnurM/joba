import { AuthResponse } from "../model/types";
import { customFetch } from "@/shared/api";
import { storage } from "@/shared/lib";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface AvailabilityResponse {
  available: boolean;
  message?: string;
}

export const authApi = {
  async signin(login: string, password: string): Promise<AuthResponse> {
    const data = await customFetch<AuthResponse>(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
      skipAuth: true,
    });

    storage.set("access_token", data.access_token);
    storage.set("refresh_token", data.refresh_token);
    return data;
  },

  async signup(
    email: string,
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    const data = await customFetch<AuthResponse>(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
      skipAuth: true,
    });

    storage.set("access_token", data.access_token);
    storage.set("refresh_token", data.refresh_token);
    return data;
  },

  async checkAvailability(
    field: "email" | "username",
    value: string,
  ): Promise<AvailabilityResponse> {
    return customFetch<AvailabilityResponse>(
      `${API_URL}/auth/check-availability`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value }),
        skipAuth: true,
      },
    );
  },

  async refresh(): Promise<AuthResponse> {
    const refreshToken = storage.get("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const data = await customFetch<AuthResponse>(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
      skipAuth: true,
    });

    storage.set("access_token", data.access_token);
    storage.set("refresh_token", data.refresh_token);
    return data;
  },
};
