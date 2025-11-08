import React, { createContext, useContext, type ReactNode } from "react";

export type ThemeMode = "light";
export type ColorScheme = "light";

interface ThemeContextType {
  themeMode: ThemeMode;
  colorScheme: ColorScheme;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always use light mode
  const themeMode: ThemeMode = "light";
  const colorScheme: ColorScheme = "light";

  const setThemeMode = async (_mode: ThemeMode) => {
    // No-op: theme mode is always light
  };

  return <ThemeContext.Provider value={{ themeMode, colorScheme, setThemeMode }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
