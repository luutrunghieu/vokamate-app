import { ReactNode, cloneElement, isValidElement, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { tailwindColors } from "@/constants/tailwind-colors";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ChevronDownOutline, HelpCircleSolid } from "@/src/components/Icons";

export type InputType = "default" | "leading-dropdown" | "trailing-dropdown";

export interface InputProps extends Omit<TextInputProps, "style"> {
  /**
   * Input type variant
   * @default "default"
   */
  type?: InputType;
  /**
   * Label text displayed above the input
   */
  label?: string;
  /**
   * Whether the input is required (shows asterisk)
   * @default false
   */
  required?: boolean;
  /**
   * Icon displayed on the leading side (left)
   */
  leadingIcon?: ReactNode;
  /**
   * Icon displayed on the trailing side (right) - works similar to leading icon
   */
  trailingIcon?: ReactNode;
  /**
   * Whether the leading icon is clickable
   * @default false
   */
  leadingIconClickable?: boolean;
  /**
   * Callback when leading icon is pressed (only works if leadingIconClickable is true)
   */
  onLeadingIconPress?: () => void;
  /**
   * Whether the trailing icon is clickable
   * @default false
   */
  trailingIconClickable?: boolean;
  /**
   * Callback when trailing icon is pressed (only works if trailingIconClickable is true)
   */
  onTrailingIconPress?: () => void;
  /**
   * Hint text displayed below the input
   */
  hintText?: string;
  /**
   * Whether to show help icon (trailing icon)
   * @default false
   */
  showHelpIcon?: boolean;
  /**
   * Whether the help icon is clickable
   * @default false
   */
  helpIconClickable?: boolean;
  /**
   * Callback when help icon is pressed (only works if helpIconClickable is true)
   */
  onHelpIconPress?: () => void;
  /**
   * Whether the input has an error state (destructive)
   * @default false
   */
  error?: boolean;
  /**
   * Error message (overrides hintText when error is true)
   */
  errorMessage?: string;
  /**
   * Custom container style
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Custom padding left for leading dropdown
   * @default 8
   */
  leadingDropdownPaddingLeft?: number;
  /**
   * Custom padding left for trailing dropdown
   * @default 12
   */
  trailingDropdownPaddingLeft?: number;
  /**
   * Custom padding right for trailing dropdown
   * @default 8
   */
  trailingDropdownPaddingRight?: number;
}

/**
 * Input component with support for labels, icons, hints, and various states.
 *
 * @example
 * ```tsx
 * import { Input } from "@/components/ui/input";
 * import { IconSymbol } from "@/components/ui/icon-symbol";
 * import { Colors } from "@/constants/theme";
 * import { useColorScheme } from "@/hooks/use-color-scheme";
 *
 * // Basic input
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 *
 * // Required input with leading icon
 * const theme = useColorScheme() ?? "light";
 * const colors = Colors[theme];
 * <Input
 *   label="Email"
 *   required
 *   leadingIcon={<IconSymbol name="mail" size={20} color={colors.fgTertiary} />}
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 *
 * // Input with trailing icon
 * <Input
 *   label="Search"
 *   trailingIcon={<IconSymbol name="search" size={20} color={colors.fgTertiary} />}
 *   placeholder="Search..."
 *   value={search}
 *   onChangeText={setSearch}
 * />
 *
 * // Input with clickable trailing icon (e.g., password visibility toggle)
 * <Input
 *   label="Password"
 *   trailingIcon={<IconSymbol name="eye" size={20} color={colors.fgTertiary} />}
 *   trailingIconClickable
 *   onTrailingIconPress={() => {
 *     // Toggle password visibility
 *   }}
 *   placeholder="Enter your password"
 *   value={password}
 *   onChangeText={setPassword}
 * />
 *
 * // Input with error
 * <Input
 *   label="Email"
 *   required
 *   error
 *   errorMessage="This is an error message"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 *
 * // Input with hint text
 * <Input
 *   label="Email"
 *   hintText="This is a hint text to help user"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 *
 * // Disabled input
 * <Input
 *   label="Email"
 *   value="olivia@untitledui.com"
 *   editable={false}
 * />
 * ```
 */
export function Input({
  type = "default",
  label,
  required = false,
  leadingIcon,
  trailingIcon,
  leadingIconClickable = false,
  onLeadingIconPress,
  trailingIconClickable = false,
  onTrailingIconPress,
  hintText,
  showHelpIcon = false,
  helpIconClickable = false,
  onHelpIconPress,
  error = false,
  errorMessage,
  containerStyle,
  leadingDropdownPaddingLeft = 12,
  trailingDropdownPaddingLeft = 12,
  trailingDropdownPaddingRight = 8,
  placeholder,
  value,
  editable = true,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [dropdownOpen, setDropdownOpen] = useState<"leading" | "trailing" | null>(null);
  const [dropdownLayout, setDropdownLayout] = useState<{
    x: number;
    y: number;
    width: number;
  } | null>(null);
  const [selectedLeadingOption, setSelectedLeadingOption] = useState("VN");
  const [selectedTrailingOption, setSelectedTrailingOption] = useState("EN");
  const leadingDropdownRef = useRef<View>(null);
  const trailingDropdownRef = useRef<View>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  // Determine input state
  const isPlaceholder = !value || value.length === 0;
  const isFilled = !isPlaceholder && !isFocused;
  const isDisabled = !editable;
  const state = isDisabled
    ? "disabled"
    : isFocused
    ? "focused"
    : isFilled
    ? "filled"
    : "placeholder";

  // Get colors based on state
  // Error state takes priority over focus state
  const getInputColors = () => {
    if (isDisabled) {
      return {
        backgroundColor: colors.bgPrimary,
        borderColor: colors.outlineSecondary,
        textColor: colors.textTertiary,
        placeholderColor: colors.textTertiary,
      };
    }

    // Error state (always show error border, even when focused)
    if (error) {
      return {
        backgroundColor: tailwindColors.white,
        borderColor: colors.outlineRedLight,
        textColor: colors.textPrimary,
        placeholderColor: colors.textTertiary,
      };
    }

    // Focus state (only when not in error state)
    if (isFocused) {
      return {
        backgroundColor: tailwindColors.white,
        borderColor: tailwindColors.sky?.[500] || "#00a6f4", // Focus border color (sky500)
        textColor: colors.textPrimary,
        placeholderColor: colors.textTertiary,
      };
    }

    // Default/Filled state
    return {
      backgroundColor: tailwindColors.white,
      borderColor: colors.outlineSecondary,
      textColor: colors.textPrimary,
      placeholderColor: colors.textTertiary,
    };
  };

  const inputColors = getInputColors();
  const hasValue = value && value.length > 0;
  const displayTextColor =
    isPlaceholder && !isFocused ? colors.textTertiary : inputColors.textColor;

  // Helper function to clone icon with correct color based on clickability
  const cloneIconWithColor = (icon: ReactNode, clickable: boolean): ReactNode => {
    if (!isValidElement(icon)) return icon;
    const iconColor = clickable ? colors.fgPrimary : colors.fgTertiary;
    return cloneElement(icon as any, { color: iconColor });
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Handle container press to focus input
  const handleContainerPress = () => {
    if (!isDisabled) {
      inputRef.current?.focus();
    }
  };

  // Handle dropdown press to show options
  const handleDropdownPress = (position: "leading" | "trailing", event?: any) => {
    if (isDisabled) return;

    // Stop event propagation to prevent input focus
    event?.stopPropagation?.();

    // Get the correct ref based on position
    const dropdownRef = position === "leading" ? leadingDropdownRef : trailingDropdownRef;

    // Measure dropdown button position
    dropdownRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownLayout({ x, y: y + height + 2, width }); // Add 2px gap below button
      setDropdownOpen(position);

      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);

      // Start animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  // Close dropdown
  const closeDropdown = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setDropdownOpen(null);
      setDropdownLayout(null);
    });
  };

  // Handle option selection
  const handleOptionSelect = (option: string, position: "leading" | "trailing") => {
    if (position === "leading") {
      setSelectedLeadingOption(option);
    } else {
      setSelectedTrailingOption(option);
    }
    console.log(`Selected: ${option}`);
    closeDropdown();
  };

  // Get dropdown options
  const getDropdownOptions = (position: "leading" | "trailing") => {
    const isLeading = position === "leading";
    return isLeading ? ["VN", "US", "UK"] : ["EN", "VI", "FR"];
  };

  // Render dropdown button for leading/trailing dropdown types
  const renderDropdown = (position: "leading" | "trailing") => {
    if (type === "default") return null;
    if (type === "leading-dropdown" && position !== "leading") return null;
    if (type === "trailing-dropdown" && position !== "trailing") return null;

    const isLeading = position === "leading";

    return (
      <Pressable
        ref={position === "leading" ? leadingDropdownRef : trailingDropdownRef}
        style={[
          styles.dropdownButton,
          {
            paddingLeft: isLeading ? leadingDropdownPaddingLeft : trailingDropdownPaddingLeft,
            paddingRight: isLeading ? 8 : trailingDropdownPaddingRight,
            borderRightWidth: isLeading ? 1 : 0,
            borderLeftWidth: isLeading ? 0 : 1,
            borderColor: inputColors.borderColor, // Match input border color (focus/error/default)
            marginRight: isLeading && !leadingIcon ? 8 : 0, // Leading dropdown: 8px margin right only when no leading icon
            height: 44, // Full height of input
            marginVertical: 0, // Remove vertical margin to align with input height
          },
        ]}
        disabled={isDisabled}
        onPress={(e) => handleDropdownPress(position, e)}
      >
        <Text
          style={[
            styles.dropdownText,
            { color: isDisabled ? colors.textTertiary : colors.textPrimary },
          ]}
        >
          {isLeading ? selectedLeadingOption : selectedTrailingOption}
        </Text>
        <ChevronDownOutline
          width={16}
          height={16}
          color={isDisabled ? colors.textTertiary : colors.textSecondary}
        />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Pressable onPress={handleContainerPress} disabled={isDisabled}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
            {required && (
              <Text style={[styles.requiredMark, { color: colors.textNegative }]}>*</Text>
            )}
          </View>
        </Pressable>
      )}

      {/* Input Container */}
      <Pressable onPress={handleContainerPress} disabled={isDisabled}>
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: inputColors.backgroundColor,
              borderColor: inputColors.borderColor,
              paddingLeft: leadingIcon || type === "leading-dropdown" ? 0 : 14,
              paddingRight: showHelpIcon || trailingIcon || type === "trailing-dropdown" ? 0 : 14,
              overflow: "visible", // Allow dropdown to extend outside
            },
          ]}
        >
          {/* Leading Dropdown */}
          {renderDropdown("leading")}

          {/* Leading Icon */}
          {leadingIcon &&
            (leadingIconClickable ? (
              <Pressable
                onPress={() => {
                  if (!isDisabled) {
                    onLeadingIconPress?.();
                  }
                }}
                disabled={isDisabled}
              >
                <View style={styles.leadingIconContainer}>
                  {cloneIconWithColor(leadingIcon, true)}
                </View>
              </Pressable>
            ) : (
              <View style={styles.leadingIconContainer}>
                {cloneIconWithColor(leadingIcon, false)}
              </View>
            ))}

          {/* Text Input */}
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              {
                color: displayTextColor,
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor={inputColors.placeholderColor}
            value={value}
            editable={editable}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* Trailing Icon */}
          {trailingIcon &&
            (trailingIconClickable ? (
              <Pressable
                onPress={() => {
                  if (!isDisabled) {
                    onTrailingIconPress?.();
                  }
                }}
                disabled={isDisabled}
              >
                <View style={styles.trailingIconContainer}>
                  {cloneIconWithColor(trailingIcon, true)}
                </View>
              </Pressable>
            ) : (
              <View style={styles.trailingIconContainer}>
                {cloneIconWithColor(trailingIcon, false)}
              </View>
            ))}

          {/* Help Icon */}
          {showHelpIcon &&
            (helpIconClickable ? (
              <Pressable
                onPress={() => {
                  if (!isDisabled) {
                    onHelpIconPress?.();
                  }
                }}
                disabled={isDisabled}
              >
                <View style={styles.helpIconContainer}>
                  <HelpCircleSolid
                    width={16}
                    height={16}
                    color={error ? colors.textNegative : colors.fgPrimary}
                  />
                </View>
              </Pressable>
            ) : (
              <View style={styles.helpIconContainer}>
                <HelpCircleSolid
                  width={16}
                  height={16}
                  color={error ? colors.textNegative : colors.fgTertiary}
                />
              </View>
            ))}

          {/* Trailing Dropdown */}
          {renderDropdown("trailing")}
        </View>
      </Pressable>

      {/* Hint Text / Error Message */}
      {(hintText || (error && errorMessage)) && (
        <Text
          style={[
            styles.hintText,
            {
              color: error ? colors.textNegative : colors.textSecondary,
            },
          ]}
        >
          {error && errorMessage ? errorMessage : hintText}
        </Text>
      )}

      {/* Dropdown Menu Modal */}
      <Modal
        visible={dropdownOpen !== null}
        transparent
        animationType="none"
        onRequestClose={closeDropdown}
      >
        <Pressable style={styles.modalOverlay} onPress={closeDropdown}>
          <Animated.View
            style={[
              styles.dropdownMenu,
              dropdownLayout && {
                position: "absolute",
                top: dropdownLayout.y,
                left: dropdownLayout.x,
                minWidth: dropdownLayout.width,
              },
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
              {
                backgroundColor: tailwindColors.white,
                borderColor: colors.outlineSecondary,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 8,
              },
            ]}
            onStartShouldSetResponder={() => true}
          >
            {dropdownOpen &&
              getDropdownOptions(dropdownOpen).map((option, index) => {
                const isSelected =
                  (dropdownOpen === "leading" && option === selectedLeadingOption) ||
                  (dropdownOpen === "trailing" && option === selectedTrailingOption);
                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.dropdownOption,
                      index > 0 && {
                        borderTopWidth: 1,
                        borderTopColor: colors.outlineSecondary,
                      },
                      isSelected && {
                        backgroundColor: colors.bgSecondary,
                      },
                    ]}
                    onPress={() => handleOptionSelect(option, dropdownOpen)}
                  >
                    <Text
                      style={[
                        styles.dropdownOptionText,
                        {
                          color: colors.textPrimary,
                          fontWeight: isSelected ? "600" : "400",
                        },
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter",
  },
  requiredMark: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 0,
    height: 44,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  leadingIconContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  trailingIconContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  helpIconContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 19.5,
    fontFamily: "Inter",
    padding: 0,
    margin: 0,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 0, // Prevent shrinking, allow extension
  },
  dropdownText: {
    fontSize: 16,
    lineHeight: 32,
    fontWeight: "500",
    fontFamily: "Inter",
    minHeight: 32,
  },
  hintText: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Inter",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdownMenu: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    minWidth: 120,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: tailwindColors.white,
  },
  dropdownOptionText: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Inter",
  },
});
