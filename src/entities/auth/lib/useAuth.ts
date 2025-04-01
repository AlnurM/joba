import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuthStore } from "../model/store";
import { AuthTokens } from "../model/types";

export function useAuth() {
  const router = useRouter();
  const { isAuthenticated, isLoading, setAuthenticated, setLoading } =
    useAuthStore();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    setAuthenticated(!!accessToken);
    setLoading(false);
  }, [setAuthenticated, setLoading]);

  const login = (tokens: AuthTokens) => {
    Cookies.set("access_token", tokens.access_token, { expires: 7 }); // 7 days
    Cookies.set("refresh_token", tokens.refresh_token, { expires: 30 }); // 30 days
    setAuthenticated(true);
    router.push("/main");
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setAuthenticated(false);
    router.push("/signin");
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
