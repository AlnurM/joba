import { AuthResponse } from "../model/types";
import { customFetch } from "@/shared/api/fetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface AvailabilityResponse {
  available: boolean;
  message?: string;
}

export const authApi = {
  async signin(login: string, password: string): Promise<AuthResponse> {
    const response = await customFetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
      skipAuth: true, // Для signin не нужен токен
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to sign in");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    return data;
  },

  async signup(
    email: string,
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    const response = await customFetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
      skipAuth: true, // Для signup не нужен токен
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to sign up");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    return data;
  },

  async checkAvailability(
    field: "email" | "username",
    value: string,
  ): Promise<AvailabilityResponse> {
    const response = await customFetch(`${API_URL}/auth/check-availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field, value }),
      skipAuth: true, // Для проверки доступности не нужен токен
    });

    if (!response.ok) {
      throw new Error("Failed to check availability");
    }

    return response.json();
  },

  async refresh(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    return data;
  },
};
