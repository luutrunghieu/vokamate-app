import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

// Use localStorage for web instead of AsyncStorage to avoid SSR issues
const ExpoWebSecureStoreAdapter = {
  getItem: (key: string) => {
    if (typeof window === "undefined") {
      // Server-side rendering: return null
      return Promise.resolve(null);
    }
    const value = window.localStorage.getItem(key);
    return Promise.resolve(value);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") {
      // Server-side rendering: do nothing
      return Promise.resolve();
    }
    window.localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    if (typeof window === "undefined") {
      // Server-side rendering: do nothing
      return Promise.resolve();
    }
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
  {
    auth: {
      storage: ExpoWebSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
