import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/ui/button";
import type { InputType } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { EyeSolid, MailSolid } from "@/src/components/Icons";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InputTestScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const cardColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "border");
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  // Input config state
  const [type, setType] = useState<InputType>("default");
  const [label, setLabel] = useState("Email");
  const [value, setValue] = useState("");
  const [required, setRequired] = useState(false);
  const [showLeadingIcon, setShowLeadingIcon] = useState(false);
  const [showTrailingIcon, setShowTrailingIcon] = useState(false);
  const [showHelpIcon, setShowHelpIcon] = useState(false);
  const [showHintText, setShowHintText] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [leadingIconClickable, setLeadingIconClickable] = useState(false);
  const [trailingIconClickable, setTrailingIconClickable] = useState(false);
  const [helpIconClickable, setHelpIconClickable] = useState(false);

  const handleTypeChange = (newType: InputType) => {
    setType(newType);
  };

  const handleClearValue = () => {
    setValue("");
  };

  const handleSetFilledValue = () => {
    setValue("olivia@untitledui.com");
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor }]}
      edges={["left", "right", "bottom"]}
    >
      <ThemedView style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Preview Section */}
          <ThemedView style={styles.section}>
            <ThemedView style={[styles.previewCard, { backgroundColor: cardColor, borderColor }]}>
              <Input
                type={type}
                label={label}
                required={required}
                leadingIcon={
                  showLeadingIcon ? (
                    <MailSolid width={20} height={20} color={colors.fgTertiary} />
                  ) : undefined
                }
                leadingIconClickable={leadingIconClickable}
                onLeadingIconPress={() => {
                  console.log("Leading icon pressed");
                }}
                trailingIcon={
                  showTrailingIcon ? (
                    <EyeSolid width={20} height={20} color={colors.fgTertiary} />
                  ) : undefined
                }
                trailingIconClickable={trailingIconClickable}
                onTrailingIconPress={() => {
                  console.log("Trailing icon pressed");
                }}
                showHelpIcon={showHelpIcon}
                helpIconClickable={helpIconClickable}
                onHelpIconPress={() => {
                  console.log("Help icon pressed");
                }}
                hintText={showHintText ? "This is a hint text to help user" : undefined}
                error={error}
                errorMessage={error ? "This is an error message" : undefined}
                placeholder="olivia@untitledui.com"
                value={value}
                onChangeText={setValue}
                editable={!disabled}
              />
            </ThemedView>
          </ThemedView>

          {/* Controls Section */}
          <ThemedView style={styles.section}>
            <View>
              {/* Type Selection */}
              <View style={styles.controlGroup}>
                <ThemedText style={styles.controlLabel}>Type</ThemedText>
                <View style={styles.buttonRow}>
                  <Button
                    variant={type === "default" ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => handleTypeChange("default")}
                  >
                    Default
                  </Button>
                  <Button
                    variant={type === "leading-dropdown" ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => handleTypeChange("leading-dropdown")}
                  >
                    Leading Dropdown
                  </Button>
                  <Button
                    variant={type === "trailing-dropdown" ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => handleTypeChange("trailing-dropdown")}
                  >
                    Trailing Dropdown
                  </Button>
                </View>
              </View>

              {/* Value Controls */}
              <View style={styles.controlGroup}>
                <ThemedText style={styles.controlLabel}>Value</ThemedText>
                <View style={styles.buttonRow}>
                  <Button variant="secondary" width="hug" onPress={handleClearValue}>
                    Clear
                  </Button>
                  <Button variant="secondary" width="hug" onPress={handleSetFilledValue}>
                    Set Filled
                  </Button>
                </View>
              </View>

              {/* Toggle Controls */}
              <View style={styles.controlGroup}>
                <ThemedText style={styles.controlLabel}>Options</ThemedText>
                <View style={styles.toggleGrid}>
                  <Button
                    variant={required ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => setRequired(!required)}
                  >
                    Required {required ? "✓" : ""}
                  </Button>
                  <Button
                    variant={showLeadingIcon ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => setShowLeadingIcon(!showLeadingIcon)}
                  >
                    Leading Icon {showLeadingIcon ? "✓" : ""}
                  </Button>
                  <Button
                    variant={showTrailingIcon ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => setShowTrailingIcon(!showTrailingIcon)}
                  >
                    Trailing Icon {showTrailingIcon ? "✓" : ""}
                  </Button>
                  <Button
                    variant={showHelpIcon ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => setShowHelpIcon(!showHelpIcon)}
                  >
                    Help Icon {showHelpIcon ? "✓" : ""}
                  </Button>
                  <Button
                    variant={leadingIconClickable ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => setLeadingIconClickable(!leadingIconClickable)}
                    disabled={!showLeadingIcon}
                  >
                    Leading Clickable {leadingIconClickable ? "✓" : ""}
                  </Button>
                  <Button
                    variant={trailingIconClickable ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => setTrailingIconClickable(!trailingIconClickable)}
                    disabled={!showTrailingIcon}
                  >
                    Trailing Clickable {trailingIconClickable ? "✓" : ""}
                  </Button>
                  <Button
                    variant={helpIconClickable ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => setHelpIconClickable(!helpIconClickable)}
                    disabled={!showHelpIcon}
                  >
                    Help Clickable {helpIconClickable ? "✓" : ""}
                  </Button>
                  <Button
                    variant={showHintText ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => setShowHintText(!showHintText)}
                  >
                    Hint Text {showHintText ? "✓" : ""}
                  </Button>
                  <Button
                    variant={error ? "negative" : "secondary"}
                    width="hug"
                    onPress={() => setError(!error)}
                  >
                    Error {error ? "✓" : ""}
                  </Button>
                  <Button
                    variant={disabled ? "primary" : "secondary"}
                    width="hug"
                    onPress={() => setDisabled(!disabled)}
                  >
                    Disabled {disabled ? "✓" : ""}
                  </Button>
                </View>
              </View>
            </View>
          </ThemedView>

          {/* Footer padding */}
          <View style={styles.footer} />
        </ScrollView>
      </ThemedView>
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
  content: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  previewCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  controlsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  controlGroup: {
    marginBottom: 24,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    color: "#62748e",
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  toggleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  footer: {
    height: 40,
  },
});
