import { Button } from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { tailwindColors } from "@/constants/tailwind-colors";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { FlagUs, XCircleSolid } from "@/src/components/Icons";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, TextInput, View } from "react-native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface SearchInputRef {
  blur: () => void;
  focus: () => void;
}

// Normalize text based on selected language
const normalizeTextForLanguage = (text: string, language: "EN"): string => {
  if (language === "EN") {
    // Convert to lowercase
    let normalized = text.toLowerCase();
    // Remove all spaces
    normalized = normalized.replace(/\s/g, "");
    return normalized;
  }
  return text;
};

export const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(
  ({ value, onChangeText, onSubmit, placeholder = "Nhập từ vựng...", onFocus, onBlur }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const focusAnimation = useRef(new Animated.Value(0)).current;
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    const textColor = useThemeColor({}, "text");
    const textTertiary = useThemeColor({}, "textTertiary");
    const textPrimary = useThemeColor({}, "textPrimary");
    const textSecondary = useThemeColor({}, "textSecondary");

    // Current selected language (EN for now)
    const selectedLanguage: "EN" = "EN";

    // Handle focus with animation
    const handleFocus = useCallback(() => {
      setIsFocused(true);
      Animated.timing(focusAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      onFocus?.();
    }, [focusAnimation, onFocus]);

    // Handle blur with animation
    const handleBlur = useCallback(() => {
      setIsFocused(false);
      Animated.timing(focusAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      onBlur?.();
    }, [focusAnimation, onBlur]);

    // Expose blur and focus methods to parent
    useImperativeHandle(ref, () => ({
      blur: () => {
        inputRef.current?.blur();
        handleBlur();
      },
      focus: () => {
        inputRef.current?.focus();
        handleFocus();
      },
    }));

    const hasValue = value.trim().length > 0;
    const isTyping = isFocused && hasValue;
    const isFilled = !isFocused && hasValue;

    // Handle text change with language normalization
    const handleTextChange = useCallback(
      (text: string) => {
        const normalized = normalizeTextForLanguage(text, selectedLanguage);
        onChangeText(normalized);
      },
      [onChangeText, selectedLanguage]
    );

    // Handle clear text
    const handleClear = useCallback(() => {
      onChangeText("");
    }, [onChangeText]);

    // Handle submit with auto blur
    const handleSubmit = useCallback(() => {
      onSubmit();
      inputRef.current?.blur();
    }, [onSubmit]);

    // Animated border color
    const borderColor = focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.outlineSecondary, tailwindColors.sky?.[500] || "#00a6f4"],
    });

    // Animated shadow
    const shadowColor = tailwindColors.sky?.[200] || "#b8e6fe";
    const shadowOpacity = focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const shadowRadius = focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    });
    const elevation = focusAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    });

    // Determine text color based on state
    const getTextColor = () => {
      if (isTyping || isFilled || isFocused) {
        return textPrimary;
      }
      return textColor;
    };

    // Handle container press to focus input
    const handleContainerPress = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    return (
      <Pressable onPress={handleContainerPress}>
        <Animated.View
          style={[
            styles.container,
            {
              borderColor,
              shadowColor,
              shadowOpacity,
              shadowRadius,
              elevation,
              shadowOffset: { width: 0, height: 0 },
            },
          ]}
        >
          <View style={styles.content}>
            <View style={styles.flagContainer}>
              <FlagUs width={24} height={24} />
            </View>
            <TextInput
              ref={inputRef}
              style={[styles.input, { color: getTextColor() }]}
              placeholder={placeholder}
              placeholderTextColor={textTertiary}
              value={value}
              onChangeText={handleTextChange}
              onSubmitEditing={handleSubmit}
              returnKeyType="search"
              editable={true}
              selectTextOnFocus={false}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
          {hasValue && (
            <Pressable onPress={handleClear} style={styles.clearButton}>
              <XCircleSolid width={24} height={24} color={colors.textTertiary} />
            </Pressable>
          )}
          <Button
            variant="primary"
            iconOnly
            iconPadding={false}
            leadingIcon={<IconSymbol name="arrow.right" size={20} color={tailwindColors.white} />}
            onPress={handleSubmit}
            disabled={!hasValue}
          />
        </Animated.View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: tailwindColors.white,
    borderWidth: 1,
    borderRadius: 999,
    height: 56,
    paddingLeft: 16,
    paddingRight: 6,
    gap: 8,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  flagContainer: {
    width: 24,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "600",
    textAlignVertical: "center",
    // borderWidth: 1,
  },
  clearButton: {
    width: 24,
    height: 24,
    marginRight: 6,
    alignItems: "center",
  },
});
