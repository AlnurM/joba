import Cookies from "js-cookie";

export const storage = {
  get: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    return Cookies.get(key) || null;
  },

  set: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    if (key === "access_token") {
      Cookies.set(key, value, { expires: 7 }); // 7 days
    } else if (key === "refresh_token") {
      Cookies.set(key, value, { expires: 30 }); // 30 days
    } else {
      Cookies.set(key, value);
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    Cookies.remove(key);
  },
} as const;
