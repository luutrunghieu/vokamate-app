# Color System Guide

## Overview

The app now uses a comprehensive theme-aware color system that automatically adapts to light, dark, and system color schemes. **No hardcoded colors should be used in components.**

## Available Colors

All colors are defined in `constants/theme.ts` and are available for both light and dark modes:

### Text Colors
- `text` - Primary text color
- `textSecondary` - Secondary/muted text
- `textTertiary` - Even more muted text

### Background Colors
- `background` - Main background color
- `backgroundSecondary` - Secondary backgrounds (cards, inputs)
- `backgroundTertiary` - Tertiary backgrounds (buttons, etc.)

### Interactive Colors
- `tint` - Primary brand color (buttons, links, highlights)
- `tintSecondary` - Secondary tint color

### Icon Colors
- `icon` - Primary icon color
- `iconSecondary` - Secondary icon color

### Border Colors
- `border` - Primary border color
- `borderSecondary` - Secondary border color

### Card Colors
- `card` - Card background
- `cardBorder` - Card border

### Status Colors
- `success` - Success/positive actions
- `error` - Error/danger states
- `warning` - Warning states
- `info` - Informational states

### Tab Navigation
- `tabIconDefault` - Inactive tab icons
- `tabIconSelected` - Active tab icons

## How to Use

### 1. Using `useThemeColor` Hook

Import and use the hook in your functional components:

```typescript
import { useThemeColor } from "@/hooks/use-theme-color";

export function MyComponent() {
  // Get a color from the theme
  const textColor = useThemeColor({}, "text");
  const bgColor = useThemeColor({}, "backgroundSecondary");
  const borderColor = useThemeColor({}, "border");

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Hello</Text>
    </View>
  );
}

// Keep styles color-agnostic
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
});
```

### 2. Using Themed Components

Use the provided themed components for common elements:

#### ThemedView
```typescript
import { ThemedView } from "@/components/themed-view";

// Automatically uses the theme's background color
<ThemedView style={styles.container}>
  {/* content */}
</ThemedView>

// Override with custom light/dark colors if needed
<ThemedView 
  lightColor="#f0f0f0" 
  darkColor="#1a1a1a" 
  style={styles.container}
>
  {/* content */}
</ThemedView>
```

#### ThemedText
```typescript
import { ThemedText } from "@/components/themed-text";

// Automatically uses the theme's text color
<ThemedText>Regular text</ThemedText>

// With different types
<ThemedText type="title">Title</ThemedText>
<ThemedText type="subtitle">Subtitle</ThemedText>
<ThemedText type="link">Link text</ThemedText>
<ThemedText type="defaultSemiBold">Bold text</ThemedText>

// Override colors if needed
<ThemedText lightColor="#000" darkColor="#fff">Custom color</ThemedText>
```

### 3. Icon Colors

Always pass theme colors to icon components:

```typescript
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";

export function MyComponent() {
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");

  return (
    <>
      <IconSymbol name="heart" size={24} color={iconColor} />
      <IconSymbol name="star.fill" size={24} color={tintColor} />
    </>
  );
}
```

### 4. Dynamic Styles

Combine static and dynamic styles:

```typescript
import { useThemeColor } from "@/hooks/use-theme-color";

export function Card() {
  const cardBg = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");

  return (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: cardBg,
          borderColor: borderColor 
        }
      ]}
    >
      <Text style={[styles.text, { color: tintColor }]}>Title</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
```

## Best Practices

### ✅ DO

- Use `useThemeColor` hook for all colors
- Use themed components (`ThemedView`, `ThemedText`) when possible
- Keep `StyleSheet` definitions color-agnostic
- Apply colors via inline styles using theme values
- Use semantic color names (e.g., `tint` not "blue")

### ❌ DON'T

- Use hardcoded hex colors like `#000000` or `#ffffff`
- Use hardcoded `rgb()` or `rgba()` values
- Put colors in `StyleSheet.create()`
- Assume light or dark mode only

## Examples

### Before (Hardcoded Colors)
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E", // ❌ Hardcoded
    borderColor: "#333",        // ❌ Hardcoded
  },
  text: {
    color: "#FFFFFF",           // ❌ Hardcoded
  },
});
```

### After (Theme-Aware)
```typescript
import { useThemeColor } from "@/hooks/use-theme-color";

export function MyComponent() {
  const bgColor = useThemeColor({}, "backgroundSecondary");
  const borderColor = useThemeColor({}, "border");
  const textColor = useThemeColor({}, "text");

  return (
    <View style={[styles.container, { backgroundColor: bgColor, borderColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
  },
});
```

## Adding New Colors

To add new semantic colors to the system:

1. Open `constants/theme.ts`
2. Add the color to both `light` and `dark` color objects:

```typescript
export const Colors = {
  light: {
    // ... existing colors
    myNewColor: '#FF0000',
  },
  dark: {
    // ... existing colors
    myNewColor: '#FF6666',
  },
};
```

3. Use it in your components:

```typescript
const myColor = useThemeColor({}, "myNewColor");
```

## Theme Switching

Users can change the theme in Settings:
- **Sáng (Light)** - Forces light mode
- **Tối (Dark)** - Forces dark mode
- **Hệ thống (System)** - Follows device settings

The theme preference is persisted using AsyncStorage and applied on app startup.

## Accessing Theme Mode

To check the current theme mode or color scheme:

```typescript
import { useTheme } from "@/contexts/theme-context";

export function MyComponent() {
  const { themeMode, colorScheme, setThemeMode } = useTheme();
  
  // themeMode: 'light' | 'dark' | 'system'
  // colorScheme: 'light' | 'dark' (resolved based on themeMode)
  
  return (
    <Text>Current mode: {colorScheme}</Text>
  );
}
```

## Summary

✨ The color system is now fully theme-aware and requires no hardcoded colors!
- All components automatically adapt to light/dark mode
- Easy to maintain and extend
- Provides a consistent look across the app
- Users have full control over their preferred theme

