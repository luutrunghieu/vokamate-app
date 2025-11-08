import { DefinitionView } from "@/components/translation/definition-view";
import { SearchInput, SearchInputRef } from "@/components/translation/search-input";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { PageHeader } from "@/components/ui/page-header";
import { tailwindColors } from "@/constants/tailwind-colors";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useTranslation } from "@/hooks/use-translation";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TranslateScreen() {
  const searchInputRef = useRef<SearchInputRef>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const marginTopAnimation = useRef(new Animated.Value(40)).current;
  const {
    searchText,
    setSearchText,
    history,
    currentDefinition,
    suggestions,
    translate,
    goBack,
    saveDefinitionToFolder,
    clearHistory,
    selectHistoryItem,
    selectSuggestion,
  } = useTranslation();

  const backgroundColor = tailwindColors.slate[100] || "#f2f4f7";
  const textPrimary = useThemeColor({}, "textPrimary");
  const iconColor = useThemeColor({}, "textPrimary");

  // Animate margin-top based on focus state and definition presence
  useEffect(() => {
    const shouldShowLower = searchText.trim() === "" && !isSearchFocused && !currentDefinition;
    const targetMarginTop = shouldShowLower ? 40 : 0;

    Animated.timing(marginTopAnimation, {
      toValue: targetMarginTop,
      duration: 160,
      useNativeDriver: false,
    }).start();
  }, [searchText, isSearchFocused, currentDefinition, marginTopAnimation]);

  const handlePlayPronunciation = (accent: "us" | "uk") => {
    // TODO: Implement pronunciation playback
    console.log(`Playing ${accent.toUpperCase()} pronunciation`);
  };

  const handlePressOutside = () => {
    searchInputRef.current?.blur();
    Keyboard.dismiss();
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={["top"]}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View>
            <LinearGradient
              colors={["rgba(241,245,249,0.5)", "rgba(241,245,249,0)"]}
              style={styles.headerGradient}
            >
              <PageHeader
                title="Từ điển"
                rightButtons={
                  <TouchableOpacity style={styles.settingsButton}>
                    <IconSymbol name="slider.horizontal.3" size={20} color={iconColor} />
                  </TouchableOpacity>
                }
              />
            </LinearGradient>

            <Animated.View style={[styles.searchWrapper, { marginTop: marginTopAnimation }]}>
              <View style={styles.searchContainer}>
                <SearchInput
                  ref={searchInputRef}
                  value={searchText}
                  onChangeText={setSearchText}
                  onSubmit={() => translate()}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>

        {currentDefinition ? (
          <View style={styles.definitionWrapper}>
            <DefinitionView
              definition={currentDefinition}
              onSaveToFolder={saveDefinitionToFolder}
              onPlayPronunciation={handlePlayPronunciation}
            />
          </View>
        ) : isSearchFocused || searchText.trim() !== "" ? (
          <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={styles.definitionWrapper}>
              <View style={styles.emptyContent} />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={styles.definitionWrapper} />
        )}
      </View>
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
  headerGradient: {
    paddingTop: 6,
    paddingBottom: 8,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 99,
    backgroundColor: tailwindColors.white,
    borderWidth: 1,
    borderColor: tailwindColors.slate[200],
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  searchWrapper: {
    paddingHorizontal: 16,
  },
  searchContainer: {},
  definitionWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyContent: {
    flex: 1,
  },
});
