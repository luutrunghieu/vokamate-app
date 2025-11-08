import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { useNavigationState } from "@react-navigation/native";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  BookClosedSolid,
  HomeLineSolid,
  TranslateOutline,
  UserSolid,
} from "@/src/components/Icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();

  // Wrapper component to apply active tab styling
  function StyledTabButton(props: BottomTabBarButtonProps & { routeName?: string }) {
    const currentRoute = useNavigationState((state) => {
      if (!state) return null;
      const route = state.routes[state.index];
      // Extract route name from full path (e.g., "(tabs)/index" -> "index")
      const routeName = route?.name?.split("/").pop() || route?.name;
      return routeName;
    });

    // Check if this tab is focused by comparing route names or accessibility state
    const isFocused =
      props.routeName === currentRoute || props.accessibilityState?.selected === true;

    return (
      <View
        style={[
          baseStyles.tabBarItemContainer,
          isFocused && {
            backgroundColor: colors.bgSecondary,
            borderRadius: 99,
          },
        ]}
        pointerEvents="box-none"
      >
        <HapticTab {...props} />
      </View>
    );
  }

  const tabBarStyle = {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.outlineSecondary,
    paddingTop: 8,
    paddingBottom: 8 + insets.bottom,
    paddingHorizontal: 16,
    height: 70 + insets.bottom,
  };

  return (
    <Tabs
      initialRouteName="translate"
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarItemStyle: baseStyles.tabBarItem,
        tabBarLabelStyle: baseStyles.tabBarLabel,
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarIconStyle: baseStyles.tabBarIcon,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "T.Chủ",
          tabBarIcon: ({ color }) => <HomeLineSolid width={20} height={20} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="translate"
        options={{
          title: "Từ điển",
          tabBarIcon: ({ color }) => <TranslateOutline width={20} height={20} color={color} />,
          tabBarButton: (props) => <StyledTabButton {...props} routeName="translate" />,
        }}
      />
      <Tabs.Screen
        name="vocabulary"
        options={{
          title: "Kho từ",
          tabBarIcon: ({ color }) => <BookClosedSolid width={20} height={20} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color }) => <UserSolid width={20} height={20} color={color} />,
          tabBarButton: (props) => <StyledTabButton {...props} routeName="settings" />,
        }}
      />
    </Tabs>
  );
}

const baseStyles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  tabBarItem: {},

  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },

  tabBarIcon: {
    marginTop: -2,
  },
});
