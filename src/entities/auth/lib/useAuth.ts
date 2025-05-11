import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../model/store";
import { AuthTokens } from "../model/types";
import { storage } from "@/shared/lib";
import { authApi } from "../api/authApi";

export function useAuth() {
  const router = useRouter();
  const {
    isAuthenticated,
    isLoading,
    setAuthenticated,
    setLoading,
    setUserData,
    setOnboarding,
    clearUserData,
  } = useAuthStore();

  useEffect(() => {
    const accessToken = storage.get("access_token");
    setAuthenticated(!!accessToken);
    setLoading(false);

    if (accessToken) {
      authApi.me().then((data) => {
        setUserData(data.id, data.onboarding);
      });
    }
  }, []);

  const login = (tokens: AuthTokens) => {
    storage.set("access_token", tokens.access_token);
    storage.set("refresh_token", tokens.refresh_token);
    setAuthenticated(true);

    authApi
      .me()
      .then((data) => {
        setUserData(data.id, data.onboarding);
        router.push("/main");
      })
      .catch(() => {
        clearUserData();
        router.push("/main");
      });
  };

  const logout = () => {
    storage.remove("access_token");
    storage.remove("refresh_token");
    setAuthenticated(false);
    clearUserData();
    router.push("/signin");
  };

  const updateOnboarding = async (onboarding: boolean) => {
    try {
      setOnboarding(onboarding);
      authApi.updateOnboarding(onboarding);
    } catch (error) {
      console.error("Failed to update onboarding status:", error);
      throw error;
    }
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateOnboarding,
  };
}
