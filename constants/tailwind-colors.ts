/**
 * Tailwind CSS color palette
 *
 * Import Tailwind's color palette for use in React Native components.
 * These are just hex color strings that work perfectly with StyleSheet.
 *
 * Usage:
 * ```tsx
 * import { tailwindColors } from '@/constants/tailwind-colors';
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: tailwindColors.blue[500],
 *     borderColor: tailwindColors.gray[300],
 *   },
 * });
 * ```
 */

// Import Tailwind colors using require for CommonJS compatibility
// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindColorsModule = require("tailwindcss/colors");
const colors = tailwindColorsModule.default || tailwindColorsModule;

// Export Tailwind colors for easy access
export const tailwindColors = colors;

// Type helper for Tailwind color names
export type TailwindColorName = keyof typeof colors;
