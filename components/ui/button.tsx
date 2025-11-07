import * as Haptics from "expo-haptics";
import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
} from "react-native";

import { tailwindColors } from "@/constants/tailwind-colors";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "highlight"
  | "positive"
  | "negative";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  /**
   * Button variant style
   * @default "primary"
   */
  variant?: ButtonVariant;
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Button text content
   */
  children?: ReactNode;
  /**
   * Icon to display before the text (leading icon)
   */
  leadingIcon?: ReactNode;
  /**
   * Icon to display after the text (trailing icon)
   */
  trailingIcon?: ReactNode;
  /**
   * Whether to show as icon-only button (44x44px square)
   * @default false
   */
  iconOnly?: boolean;
  /**
   * Whether to apply padding to icon-only buttons
   * @default true
   */
  iconPadding?: boolean;
  /**
   * Button width variant
   * - "hug": Hugs to its content (default) - button sizes to fit its content
   * - "fill": Extends to full width of container
   * @default "hug"
   */
  width?: "hug" | "fill";
}

/**
 * @example
 * ```tsx
 * // ============================================
 * // Basic Usage
 * // ============================================
 *
 * // Primary button (default: width="hug")
 * <Button variant="primary" onPress={handlePress}>
 *   Click me
 * </Button>
 *
 * // ============================================
 * // Variants
 * // ============================================
 *
 * <Button variant="primary">Primary Action</Button>
 * <Button variant="secondary">Secondary Action</Button>
 * <Button variant="tertiary">Tertiary Action</Button>
 * <Button variant="highlight">Highlight Action</Button>
 * <Button variant="positive">Positive Action</Button>
 * <Button variant="negative">Delete</Button>
 *
 * // ============================================
 * // Width Options
 * // ============================================
 *
 * // Hug width (default) - button sizes to content
 * <Button variant="primary" width="hug">
 *   Save
 * </Button>
 *
 * // Fill width - button extends to full container width
 * <Button variant="primary" width="fill">
 *   Submit Form
 * </Button>
 *
 * // ============================================
 * // Icons
 * // ============================================
 *
 * // Leading icon (icon before text)
 * <Button
 *   variant="primary"
 *   leadingIcon={<IconSymbol name="chevron.right" size={20} color={white} />}
 * >
 *   Continue
 * </Button>
 *
 * // Trailing icon (icon after text)
 * <Button
 *   variant="secondary"
 *   trailingIcon={<IconSymbol name="chevron.right" size={20} color={dark} />}
 * >
 *   Next
 * </Button>
 *
 * // Both icons
 * <Button
 *   variant="tertiary"
 *   leadingIcon={<IconSymbol name="plus-circle" size={20} color={dark} />}
 *   trailingIcon={<IconSymbol name="chevron.right" size={20} color={dark} />}
 * >
 *   Add Item
 * </Button>
 *
 * // ============================================
 * // Icon-Only Buttons
 * // ============================================
 *
 * // Icon-only button (44x44px, with padding)
 * <Button
 *   variant="primary"
 *   iconOnly
 *   leadingIcon={<IconSymbol name="gear" size={20} color={white} />}
 *   onPress={handleSettings}
 * />
 *
 * // Icon-only button without padding
 * <Button
 *   variant="secondary"
 *   iconOnly
 *   iconPadding={false}
 *   leadingIcon={<IconSymbol name="settings" size={20} color={dark} />}
 *   onPress={handleSettings}
 * />
 *
 * // ============================================
 * // States
 * // ============================================
 *
 * // Disabled button
 * <Button variant="primary" disabled onPress={handlePress}>
 *   Disabled Button
 * </Button>
 *
 * // Loading button
 * <Button variant="primary" loading onPress={handlePress}>
 *   Processing...
 * </Button>
 *
 * // ============================================
 * // Common Patterns
 * // ============================================
 *
 * // Form submission (full width primary action)
 * <Button variant="primary" width="fill" onPress={handleSubmit}>
 *   Submit
 * </Button>
 *
 * // Action buttons side by side (hug width)
 * <View style={{ flexDirection: 'row', gap: 12 }}>
 *   <Button variant="primary" width="hug" onPress={handleSave}>
 *     Save
 *   </Button>
 *   <Button variant="secondary" width="hug" onPress={handleCancel}>
 *     Cancel
 *   </Button>
 * </View>
 *
 * // Modal/Dialog pattern (primary fill, secondary hug)
 * <View>
 *   <Button variant="primary" width="fill" onPress={handleConfirm}>
 *     Confirm
 *   </Button>
 *   <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
 *     <Button variant="tertiary" width="hug" onPress={handleCancel}>
 *       Cancel
 *     </Button>
 *   </View>
 * </View>
 * ```
 */
export function Button({
  variant = "primary",
  disabled = false,
  loading = false,
  children,
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  iconPadding = true,
  width = "hug",
  style,
  ...props
}: ButtonProps) {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  // Get button colors based on variant using existing theme colors
  const getButtonColors = () => {
    if (disabled) {
      return {
        backgroundColor: colors.bgSecondary,
        color: colors.textTertiary,
        borderColor: colors.outlinePrimary,
        shadowColor: undefined,
      };
    }

    switch (variant) {
      case "primary":
        return {
          backgroundColor: colors.fgPrimary,
          color: tailwindColors.white,
          borderColor: colors.fgPrimary,
          shadowColor: tailwindColors.slate[600],
        };
      case "secondary":
        return {
          backgroundColor: colors.bgSecondary,
          color: colors.textPrimary,
          borderColor: colors.outlinePrimary,
          shadowColor: tailwindColors.slate[100],
        };
      case "tertiary":
        return {
          backgroundColor: tailwindColors.white,
          color: colors.fgPrimary,
          borderColor: colors.outlineSecondary,
          shadowColor: undefined,
        };
      case "highlight":
        return {
          backgroundColor: colors.info,
          color: tailwindColors.white,
          borderColor: tailwindColors.blue[600],
          shadowColor: tailwindColors.blue[400],
        };
      case "positive":
        return {
          backgroundColor: tailwindColors.emerald[600],
          color: tailwindColors.white,
          borderColor: tailwindColors.emerald[700],
          shadowColor: tailwindColors.emerald[500],
        };
      case "negative":
        return {
          backgroundColor: colors.bgNegative,
          color: tailwindColors.white,
          borderColor: colors.outlineRed,
          shadowColor: tailwindColors.red[400],
        };
      default:
        return {
          backgroundColor: colors.fgPrimary,
          color: tailwindColors.white,
          borderColor: colors.fgPrimary,
          shadowColor: tailwindColors.slate[600],
        };
    }
  };

  const buttonColors = getButtonColors();
  const hasText = !iconOnly && children;
  const hasLeadingIcon = !!leadingIcon;
  const hasTrailingIcon = !!trailingIcon;

  // Extract onPress from props to avoid override
  const { onPress, ...restProps } = props;

  // Handle haptic feedback on press
  const handlePress = (event: any) => {
    if (!disabled && !loading) {
      // Trigger light haptic feedback on iOS
      if (process.env.EXPO_OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }
    onPress?.(event);
  };

  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        iconOnly ? styles.buttonIconOnly : styles.buttonWithText,
        width === "fill" && !iconOnly && styles.buttonFill,
        width === "hug" && !iconOnly && styles.buttonHug,
        {
          backgroundColor:
            variant === "tertiary" && pressed
              ? tailwindColors.slate[100]
              : buttonColors.backgroundColor,
          borderColor: buttonColors.borderColor,
          opacity: variant === "tertiary" ? 1 : pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
        buttonColors.shadowColor && styles.buttonShadow,
        buttonColors.shadowColor && {
          shadowColor: buttonColors.shadowColor,
        },
        style,
      ]}
      onPress={handlePress}
      {...restProps}
    >
      {({ pressed }) => (
        <>
          {/* Top highlight overlay for inset shadow effect - inside button */}
          {buttonColors.shadowColor && !disabled && !pressed && (
            <View
              style={[
                styles.topHighlight,
                {
                  backgroundColor: "transparent",
                  borderTopWidth: 2,
                  borderTopColor: buttonColors.shadowColor,
                  borderLeftWidth: 0.5,
                  borderLeftColor: buttonColors.shadowColor,
                  borderRightWidth: 0.5,
                  borderRightColor: buttonColors.shadowColor,
                  borderRadius: 99, // Match button border radius
                },
              ]}
            />
          )}
          <View
            style={[
              styles.content,
              iconOnly && !iconPadding && styles.contentNoPadding,
              (hasLeadingIcon || hasTrailingIcon) && hasText ? styles.contentWithGap : undefined,
              iconOnly && iconPadding && styles.contentIconPadding,
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color={buttonColors.color} />
            ) : (
              <>
                {hasLeadingIcon && <View style={styles.iconContainer}>{leadingIcon}</View>}
                {hasText && (
                  <Text style={[styles.text, { color: buttonColors.color }]}>{children}</Text>
                )}
                {hasTrailingIcon && <View style={styles.iconContainer}>{trailingIcon}</View>}
              </>
            )}
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 99, // Fully rounded
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // Ensure content doesn't overflow rounded corners
  },
  buttonWithText: {
    height: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonIconOnly: {
    width: 44,
    height: 44,
  },
  buttonHug: {
    alignSelf: "flex-start", // Makes button hug its content instead of filling parent
  },
  buttonFill: {
    width: "100%",
  },
  buttonShadow: {
    // Inset shadow effect - React Native doesn't support inset shadows directly
    // Using elevation for Android and shadowColor/shadowOffset for iOS
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  topHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Full height of button
    backgroundColor: "transparent",
    borderRadius: 99, // Match button border radius to curve with corners
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentNoPadding: {
    padding: 0,
  },
  contentIconPadding: {
    padding: 12, // Padding for icon-only buttons when iconPadding is true
  },
  contentWithGap: {
    gap: 6, // Gap between icon and text
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600", // Semi Bold
    fontFamily: "Inter",
  },
});
