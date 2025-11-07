import { Platform } from "react-native";
import { tailwindColors } from "./tailwind-colors";

const tintColorLight = "#11181C";
const tintColorDark = "#ECEDEE";

export const Colors = {
  light: {
    // Tailwind-based colors

    //Text
    textPrimary: tailwindColors.slate[900],
    textSecondary: tailwindColors.slate[500],
    textTertiary: tailwindColors.slate[300],
    textNegative: tailwindColors.red[600],
    textPositive: tailwindColors.emerald[600],

    //Outline
    outlinePrimary: tailwindColors.slate[300],
    outlineSecondary: tailwindColors.slate[200],
    outlineRed: tailwindColors.red[600],
    outlineRedLight: tailwindColors.red[300],

    //Background
    bgPrimary: tailwindColors.slate[100],
    bgSecondary: tailwindColors.slate[200],
    bgNegative: tailwindColors.red[500],
    bgNegativeLight: tailwindColors.red[100],

    //Foreground
    fgPrimary: tailwindColors.slate[900],
    fgSecondary: tailwindColors.slate[500],
    fgTertiary: tailwindColors.slate[300],
    fgNegative: tailwindColors.red[600],

    // Original theme colors
    text: "#11181C",
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
    // Tailwind-based colors (dark mode)

    //Text
    textPrimary: tailwindColors.slate[50],
    textSecondary: tailwindColors.slate[400],
    textTertiary: tailwindColors.slate[500],
    textNegative: tailwindColors.red[400],
    textPositive: tailwindColors.emerald[400],

    //Outline
    outlinePrimary: tailwindColors.slate[600],
    outlineSecondary: tailwindColors.slate[700],
    outlineRed: tailwindColors.red[500],
    outlineRedLight: tailwindColors.red[400],

    //Background
    bgPrimary: tailwindColors.slate[900],
    bgSecondary: tailwindColors.slate[800],
    bgNegative: tailwindColors.red[600],
    bgNegativeLight: tailwindColors.red[900],

    //Foreground
    fgPrimary: tailwindColors.slate[50],
    fgSecondary: tailwindColors.slate[400],
    fgTertiary: tailwindColors.slate[500],
    fgNegative: tailwindColors.red[400],

    // Original theme colors
    text: "#ECEDEE",
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
