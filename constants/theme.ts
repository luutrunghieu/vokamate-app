/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#11181C";
const tintColorDark = "#ECEDEE";

export const Colors = {
  light: {
    text: "#11181C",
    textSecondary: "#687076",
    textTertiary: "#9BA1A6",
    background: "#fff",
    backgroundSecondary: "#f5f5f5",
    backgroundTertiary: "#e8e8e8",
    tint: tintColorLight,
    tintSecondary: "#0891b2",
    icon: "#687076",
    iconSecondary: "#9BA1A6",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#e0e0e0",
    borderSecondary: "#d0d0d0",
    card: "#fff",
    cardBorder: "#e8e8e8",
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  },
  dark: {
    text: "#ECEDEE",
    textSecondary: "#9BA1A6",
    textTertiary: "#687076",
    background: "#151718",
    backgroundSecondary: "#1f2123",
    backgroundTertiary: "#2a2c2e",
    tint: tintColorDark,
    tintSecondary: "#4FC3F7",
    icon: "#9BA1A6",
    iconSecondary: "#687076",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    border: "#2a2c2e",
    borderSecondary: "#3a3c3e",
    card: "#1f2123",
    cardBorder: "#2a2c2e",
    success: "#34d399",
    error: "#f87171",
    warning: "#fbbf24",
    info: "#60a5fa",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
