import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
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
  const iconColor = useThemeColor({}, "icon");
  const borderColor = useThemeColor({}, "border");
  const textSecondary = useThemeColor({}, "textSecondary");

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity
      style={[styles.historyItem, { borderBottomColor: borderColor }]}
      onPress={() => onItemPress?.(item)}
    >
      <View style={styles.historyLeft}>
        <IconSymbol name="clock" size={18} color={iconColor} />
        <ThemedText style={styles.historyText}>{item.word}</ThemedText>
      </View>
      <IconSymbol name="arrow.right" size={22} color={iconColor} />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={[styles.title, { color: textSecondary }]}>Dịch gần đây</ThemedText>
        <TouchableOpacity onPress={onClearHistory} style={styles.clearButtonContainer}>
          <ThemedText style={[styles.clearButton, { color: textSecondary }]}>Xóa lịch sử</ThemedText>
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
    paddingVertical: 10,
    paddingLeft: 10,
  },
  title: {
    fontWeight: "bold",
  },
  clearButtonContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  clearButton: {},
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
    gap: 16,
    flex: 1,
  },
  historyText: {
    fontSize: 17,
    letterSpacing: 0.2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
  },
});
