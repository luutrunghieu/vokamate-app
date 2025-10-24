import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const textSecondary = useThemeColor({}, "textSecondary");
  const successColor = useThemeColor({}, "success");
  const infoColor = useThemeColor({}, "info");
  const warningColor = useThemeColor({}, "warning");
  const backgroundSecondary = useThemeColor({}, "backgroundSecondary");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  // Fake analytics data
  const stats = [
    { icon: "book", label: "Từ đã học", value: "247", color: tintColor },
    { icon: "flame", label: "Chuỗi ngày", value: "12", color: warningColor },
    { icon: "time", label: "Phút học", value: "1,580", color: infoColor },
    { icon: "checkmark-circle", label: "Độ chính xác", value: "87%", color: successColor },
  ];

  const weeklyData = [
    { day: "T2", value: 65, label: "15 từ" },
    { day: "T3", value: 80, label: "22 từ" },
    { day: "T4", value: 45, label: "12 từ" },
    { day: "T5", value: 90, label: "28 từ" },
    { day: "T6", value: 75, label: "18 từ" },
    { day: "T7", value: 55, label: "14 từ" },
    { day: "CN", value: 40, label: "8 từ" },
  ];

  const recentActivity = [
    { word: "Xin chào", translation: "Hello", time: "5 phút trước", correct: true },
    { word: "Cảm ơn", translation: "Thank you", time: "12 phút trước", correct: true },
    { word: "Tạm biệt", translation: "Goodbye", time: "25 phút trước", correct: false },
    { word: "Xin lỗi", translation: "Sorry", time: "1 giờ trước", correct: true },
  ];

  const maxValue = Math.max(...weeklyData.map((d) => d.value));

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.greeting}>
            {getGreeting()}
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: textSecondary }]}>
            Tiếp tục học tập để duy trì chuỗi của bạn! 🔥
          </ThemedText>
        </ThemedView>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <ThemedView key={index} style={[styles.statCard, { backgroundColor: cardColor, borderColor }]}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color + "15" }]}>
                <Ionicons name={stat.icon as any} size={24} color={stat.color} />
              </View>
              <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: textSecondary }]}>{stat.label}</ThemedText>
            </ThemedView>
          ))}
        </View>

        {/* Weekly Progress */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Tiến độ tuần này</ThemedText>
          <ThemedView style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            <View style={styles.chartContainer}>
              {weeklyData.map((day, index) => (
                <View key={index} style={styles.chartBar}>
                  <ThemedText style={[styles.chartValue, { color: textSecondary }]}>{day.label}</ThemedText>
                  <View style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${(day.value / maxValue) * 100}%`,
                          backgroundColor: tintColor + "30",
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.barFill,
                          {
                            backgroundColor: tintColor,
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <ThemedText style={styles.chartDay}>{day.day}</ThemedText>
                </View>
              ))}
            </View>
            <View style={[styles.chartLegend, { borderTopColor: borderColor }]}>
              <Ionicons name="trending-up" size={16} color={successColor} />
              <ThemedText style={[styles.legendText, { color: textSecondary }]}>Tăng 23% so với tuần trước</ThemedText>
            </View>
          </ThemedView>
        </ThemedView>

        {/* Recent Activity */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Hoạt động gần đây</ThemedText>
          <ThemedView style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            {recentActivity.map((activity, index) => (
              <View key={index}>
                {index > 0 && <View style={[styles.divider, { backgroundColor: borderColor }]} />}
                <View style={styles.activityItem}>
                  <View
                    style={[
                      styles.activityIcon,
                      { backgroundColor: activity.correct ? successColor + "15" : warningColor + "15" },
                    ]}
                  >
                    <Ionicons
                      name={activity.correct ? "checkmark" : "close"}
                      size={18}
                      color={activity.correct ? successColor : warningColor}
                    />
                  </View>
                  <View style={styles.activityContent}>
                    <ThemedText style={styles.activityWord}>{activity.word}</ThemedText>
                    <ThemedText style={[styles.activityTranslation, { color: textSecondary }]}>
                      {activity.translation}
                    </ThemedText>
                  </View>
                  <ThemedText style={[styles.activityTime, { color: textSecondary }]}>{activity.time}</ThemedText>
                </View>
              </View>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Quick Stats */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Thống kê nhanh</ThemedText>
          <ThemedView style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            <View style={styles.quickStat}>
              <ThemedText style={[styles.quickStatLabel, { color: textSecondary }]}>Từ học nhiều nhất</ThemedText>
              <ThemedText style={styles.quickStatValue}>Danh từ (45%)</ThemedText>
            </View>
            <View style={[styles.divider, { backgroundColor: borderColor }]} />
            <View style={styles.quickStat}>
              <ThemedText style={[styles.quickStatLabel, { color: textSecondary }]}>
                Thời gian học trung bình
              </ThemedText>
              <ThemedText style={styles.quickStatValue}>18 phút/ngày</ThemedText>
            </View>
            <View style={[styles.divider, { backgroundColor: borderColor }]} />
            <View style={styles.quickStat}>
              <ThemedText style={[styles.quickStatLabel, { color: textSecondary }]}>Mục tiêu tuần</ThemedText>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { backgroundColor: backgroundSecondary }]}>
                  <View style={[styles.progressBarFill, { backgroundColor: successColor, width: "73%" }]} />
                </View>
                <ThemedText style={[styles.progressText, { color: textSecondary }]}>73%</ThemedText>
              </View>
            </View>
          </ThemedView>
        </ThemedView>

        {/* Footer padding */}
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontWeight: "700",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
    lineHeight: 32,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    lineHeight: 28,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 180,
    marginBottom: 16,
  },
  chartBar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  chartValue: {
    fontSize: 10,
    fontWeight: "600",
  },
  barContainer: {
    width: "80%",
    height: 120,
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    minHeight: 8,
  },
  barFill: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  chartDay: {
    fontSize: 12,
    fontWeight: "600",
  },
  chartLegend: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    gap: 8,
  },
  legendText: {
    fontSize: 13,
    fontWeight: "500",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityWord: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  activityTranslation: {
    fontSize: 13,
    fontWeight: "400",
  },
  activityTime: {
    fontSize: 12,
    fontWeight: "500",
  },
  divider: {
    height: 1,
  },
  quickStat: {
    paddingVertical: 8,
  },
  quickStatLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  quickStatValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    width: 40,
  },
  footer: {
    height: 40,
  },
});
