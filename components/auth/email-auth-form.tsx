import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  EyeOffSolid,
  EyeSolid,
  LockKeyholeCircleSolid,
  LogInOutline,
  MailSolid,
  UserSolid,
} from "@/src/components/Icons";

type AuthMode = "signin" | "signup";

/**
 * Wrapper component for EyeOffSolid that always uses fgTertiary color
 * This ensures the color is not overridden by Input component's cloneIconWithColor
 */
const EyeOffSolidTertiary = ({
  width = 20,
  height = 20,
  color: _color,
  ...props
}: {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}) => {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  return <EyeOffSolid width={width} height={height} color={colors.fgTertiary} {...props} />;
};

interface EmailAuthFormProps {
  mode?: AuthMode;
  onModeChange?: (mode: AuthMode) => void;
}

/**
 * Email and password authentication form component
 * Supports both sign in and sign up modes
 */
export default function EmailAuthForm({
  mode: initialMode = "signin",
  onModeChange,
}: EmailAuthFormProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  // Separate state for signin and signup
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signinShowPassword, setSigninShowPassword] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const cardColor = useThemeColor({}, "card");
  const outlineSecondary = useThemeColor({}, "outlineSecondary");

  // Get current values based on mode
  const email = mode === "signin" ? signinEmail : signupEmail;
  const password = mode === "signin" ? signinPassword : signupPassword;

  const handleModeToggle = () => {
    const newMode = mode === "signin" ? "signup" : "signin";
    setMode(newMode);
    onModeChange?.(newMode);
    // Clear errors when switching modes
    setEmailError("");
    setPasswordError("");
  };

  /**
   * Validates email format using basic regex
   * Ensures: local part + @ + domain with at least 2 characters TLD
   */
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  /**
   * Checks if the form is valid (email and password are both valid)
   */
  const isFormValid = () => {
    const isEmailValid = email.trim() && validateEmail(email.trim());
    const isPasswordValid = password.trim() && password.length >= 6;
    return isEmailValid && isPasswordValid;
  };

  const handleSubmit = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    // Validate email
    if (!email.trim()) {
      setEmailError("Vui lòng nhập email");
      hasError = true;
    } else if (!validateEmail(email.trim())) {
      setEmailError("Email không hợp lệ");
      hasError = true;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError("Vui lòng nhập mật khẩu");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
        });

        if (error) {
          setEmailError(error.message);
          setLoading(false);
          return;
        }

        if (data.user) {
          Alert.alert(
            "Đăng ký thành công",
            "Vui lòng kiểm tra email để xác nhận tài khoản (nếu cần)",
            [
              {
                text: "OK",
                onPress: () => {
                  // Switch to sign in mode after successful signup
                  handleModeToggle();
                },
              },
            ]
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) {
          setEmailError(error.message);
          setLoading(false);
          return;
        }

        // Success - auth context will handle navigation
      }
    } catch (error: any) {
      Alert.alert("Lỗi", error.message || "Đã xảy ra lỗi không mong muốn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          { backgroundColor: cardColor, borderColor: outlineSecondary },
        ]}
      >
        <View style={styles.cardContent}>
          <View style={styles.form}>
            <Input
              label="Email"
              leadingIcon={
                <MailSolid width={20} height={20} color={colors.fgTertiary} />
              }
              placeholder="Nhập email của bạn"
              value={email}
              onChangeText={(text) => {
                if (mode === "signin") {
                  setSigninEmail(text);
                } else {
                  setSignupEmail(text);
                }
                if (emailError) setEmailError("");
              }}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              editable={!loading}
              error={!!emailError}
              errorMessage={emailError}
              containerStyle={styles.emailInput}
            />

            <Input
              label="Mật khẩu"
              leadingIcon={
                <LockKeyholeCircleSolid
                  width={20}
                  height={20}
                  color={colors.fgTertiary}
                />
              }
              trailingIcon={
                (mode === "signin" ? signinShowPassword : signupShowPassword) ? (
                  <EyeSolid width={20} height={20} color={colors.fgPrimary} />
                ) : (
                  <EyeOffSolidTertiary width={20} height={20} />
                )
              }
              trailingIconClickable
              onTrailingIconPress={() => {
                if (mode === "signin") {
                  setSigninShowPassword(!signinShowPassword);
                } else {
                  setSignupShowPassword(!signupShowPassword);
                }
              }}
              placeholder="Nhập mật khẩu"
              value={password}
              onChangeText={(text) => {
                if (mode === "signin") {
                  setSigninPassword(text);
                } else {
                  setSignupPassword(text);
                }
                if (passwordError) setPasswordError("");
              }}
              secureTextEntry={!(mode === "signin" ? signinShowPassword : signupShowPassword)}
              autoCapitalize="none"
              autoComplete={mode === "signup" ? "password-new" : "password"}
              textContentType={mode === "signup" ? "newPassword" : "password"}
              editable={!loading}
              error={!!passwordError}
              errorMessage={passwordError}
            />

            <Button
              variant={mode === "signup" ? "highlight" : "primary"}
              width="fill"
              loading={loading}
              disabled={!isFormValid()}
              leadingIcon={
                mode === "signup" ? (
                  <UserSolid width={20} height={20} />
                ) : (
                  <LogInOutline width={20} height={20} />
                )
              }
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              {mode === "signup" ? "Đăng ký" : "Đăng nhập"}
            </Button>

            <View style={styles.toggleContainer}>
              <ThemedText style={[styles.toggleText, { color: colors.textSecondary }]}>
                {mode === "signup" ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
              </ThemedText>
              <ThemedText type="link" onPress={handleModeToggle} style={styles.toggleLink}>
                {mode === "signup" ? "Đăng nhập" : "Đăng ký"}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
  },
  cardContent: {
    padding: 16,
  },
  form: {
    gap: 16,
  },
  emailInput: {
    paddingTop: 8,
  },
  submitButton: {
    marginTop: 8,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  toggleText: {
    fontSize: 14,
  },
  toggleLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
