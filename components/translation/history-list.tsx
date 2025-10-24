import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { HistoryItem } from "@/types/translation";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedView } from "../themed-view";

interface HistoryListProps {
  data: HistoryItem[];
  onClearHistory: () => void;
  onItemPress?: (item: HistoryItem) => void;
}

export function HistoryList({ data, onClearHistory, onItemPress }: HistoryListProps) {
  const renderItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity style={styles.historyItem} onPress={() => onItemPress?.(item)}>
      <View style={styles.historyLeft}>
        <IconSymbol name="clock" size={18} color="#888" />
        <ThemedText style={styles.historyText}>{item.word}</ThemedText>
      </View>
      <IconSymbol name="arrow.right" size={22} color="#555" />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Dịch gần đây</ThemedText>
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
        ListEmptyComponent={<ThemedText style={styles.emptyText}>Chưa có lịch sử dịch</ThemedText>}
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
    color: "#999",
    fontWeight: "bold",
  },
  clearButtonContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  clearButton: {
    color: "#666",
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
    borderBottomColor: "#2A2A2A",
  },
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  historyText: {
    fontSize: 17,
    color: "#E0E0E0",
    letterSpacing: 0.2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    color: "#666",
  },
});
