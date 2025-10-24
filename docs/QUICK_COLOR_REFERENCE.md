# Quick Color Reference

## Common Usage Patterns

### 1. Basic Component with Theme Colors

```typescript
import { useThemeColor } from "@/hooks/use-theme-color";

export function MyComponent() {
  const bgColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Content</Text>
    </View>
  );
}
```

### 2. Using Themed Components (Easier!)

```typescript
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

export function MyComponent() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Content</ThemedText>
    </ThemedView>
  );
}
```

### 3. Icons with Theme Colors

```typescript
const iconColor = useThemeColor({}, "icon");
<IconSymbol name="heart" size={24} color={iconColor} />
```

### 4. Buttons/Interactive Elements

```typescript
const tintColor = useThemeColor({}, "tint");
const bgSecondary = useThemeColor({}, "backgroundSecondary");

<TouchableOpacity style={[styles.button, { backgroundColor: bgSecondary }]}>
  <Text style={[styles.buttonText, { color: tintColor }]}>Press Me</Text>
</TouchableOpacity>
```

### 5. Borders

```typescript
const borderColor = useThemeColor({}, "border");

<View style={[styles.card, { borderColor }]}>
  {/* content */}
</View>
```

## Color Mapping Cheatsheet

| Use Case | Color Name |
|----------|-----------|
| Main text | `text` |
| Muted/secondary text | `textSecondary` |
| Very muted text | `textTertiary` |
| Screen background | `background` |
| Card/input background | `backgroundSecondary` |
| Button backgrounds | `backgroundTertiary` |
| Brand color/links | `tint` |
| Icons | `icon` |
| Borders | `border` |
| Success states | `success` |
| Error states | `error` |
| Warnings | `warning` |
| Info messages | `info` |

## Color Values

### Light Mode
- Text: Dark grays/blacks
- Backgrounds: White to light grays
- Tint: `#0a7ea4` (cyan blue)
- Borders: Light gray
- Success: Green
- Error: Red

### Dark Mode
- Text: White to light grays
- Backgrounds: Very dark grays/blacks
- Tint: `#4FC3F7` (bright cyan)
- Borders: Dark gray
- Success: Bright green
- Error: Bright red

## Remember

✅ Always use `useThemeColor` hook
✅ Apply colors via inline styles, not in StyleSheet
✅ Use semantic color names
✅ Use ThemedView/ThemedText when possible

❌ Never hardcode hex colors
❌ Never put colors in StyleSheet.create()
❌ Never assume one theme only

