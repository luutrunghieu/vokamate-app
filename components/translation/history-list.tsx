import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { tailwindColors } from "@/constants/tailwind-colors";
import { useThemeColor } from "@/hooks/use-theme-color";
import { HistoryItem } from "@/types/translation";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "../themed-view";

interface HistoryListProps {
  data: HistoryItem[];
  onClearHistory: () => void;
  onItemPress?: (item: HistoryItem) => void;
}

export function HistoryList({ data, onClearHistory, onItemPress }: HistoryListProps) {
  const clockIconColor = tailwindColors.slate[400] || "#90a1b9";
  const arrowIconColor = tailwindColors.slate[300] || "#cad5e2";
  const borderColor = useThemeColor({}, "border");
  const textSecondary = useThemeColor({}, "textSecondary");

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity
      style={[styles.historyItem, { borderBottomColor: borderColor }]}
      onPress={() => onItemPress?.(item)}
    >
      <View style={styles.historyLeft}>
        <IconSymbol name="clock.rewind" size={20} color={clockIconColor} />
        <ThemedText style={styles.historyText}>{item.word}</ThemedText>
      </View>
      <IconSymbol name="arrow.right" size={20} color={arrowIconColor} />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container} lightColor="transparent" darkColor="transparent">
      <View style={styles.header}>
        <ThemedText style={[styles.title, { color: textSecondary }]}>Dịch gần đây</ThemedText>
        <TouchableOpacity onPress={onClearHistory} style={styles.clearButtonContainer}>
          <ThemedText style={styles.clearButton}>Xóa lịch sử</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedText style={[styles.emptyText, { color: textSecondary }]}>Chưa có lịch sử dịch</ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 0,
    paddingLeft: 10,
    height: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  clearButtonContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  clearButton: {
    fontSize: 14,
    color: tailwindColors.slate[400],
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  historyText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
  },
});
