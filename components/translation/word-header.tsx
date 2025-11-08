import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface WordHeaderProps {
  word: string;
  pronunciation?: {
    us?: string;
    uk?: string;
  };
  onPlayPronunciation?: (accent: "us" | "uk") => void;
}

export function WordHeader({ word, pronunciation, onPlayPronunciation }: WordHeaderProps) {
  const textSecondary = useThemeColor({}, "textSecondary");
  const textPrimary = useThemeColor({}, "textPrimary");
  const iconColor = useThemeColor({}, "fgPrimary");

  return (
    <View style={styles.container}>
      <View style={styles.wordContainer}>
        <ThemedText style={[styles.word, { color: textPrimary }]}>{word}</ThemedText>
        <View style={styles.pronunciationRow}>
          {pronunciation?.us && (
            <View style={styles.pronunciationGroup}>
              <TouchableOpacity
                style={styles.audioButton}
                onPress={() => onPlayPronunciation?.("us")}
              >
                <IconSymbol name="speaker.wave.2.fill" size={20} color={iconColor} />
                <ThemedText style={[styles.flag, { color: textPrimary }]}>US</ThemedText>
              </TouchableOpacity>
              <ThemedText style={[styles.pronunciation, { color: textSecondary }]}>
                {pronunciation.us}
              </ThemedText>
            </View>
          )}
          {pronunciation?.uk && (
            <View style={styles.pronunciationGroup}>
              <TouchableOpacity
                style={styles.audioButton}
                onPress={() => onPlayPronunciation?.("uk")}
              >
                <IconSymbol name="speaker.wave.2.fill" size={20} color={iconColor} />
                <ThemedText style={[styles.flag, { color: textPrimary }]}>UK</ThemedText>
              </TouchableOpacity>
              <ThemedText style={[styles.pronunciation, { color: textSecondary }]}>
                {pronunciation.uk}
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 4,
    paddingBottom: 0,
  },
  wordContainer: {
    flexDirection: "column",
    gap: 4,
  },
  word: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  pronunciationRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    alignItems: "center",
  },
  pronunciationGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 36,
    justifyContent: "center",
  },
  flag: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  pronunciation: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
});
