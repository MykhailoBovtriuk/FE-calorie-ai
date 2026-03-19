import { AuthInput } from "@/components/auth/AuthInput";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginFormSchema } from "@/types/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChangeEmail = (text: string) => {
    setEmail(text);
    setFieldErrors((prev) => ({ ...prev, email: "" }));
    if (error) clearError();
  };

  const handleChangePassword = (text: string) => {
    setPassword(text);
    setFieldErrors((prev) => ({ ...prev, password: "" }));
    if (error) clearError();
  };

  const handleLogin = async () => {
    const result = LoginFormSchema.safeParse({ email, password });
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!errors[key]) errors[key] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    await login(result.data);
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerClassName="grow justify-center py-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-10">
            <Text className="text-text-primary text-3xl font-bold">Calorie AI</Text>
            <Text className="text-text-secondary text-base mt-2">Track your nutrition with AI</Text>
          </View>

          <View className="gap-4">
            <AuthInput
              label="Email"
              value={email}
              onChangeText={handleChangeEmail}
              error={fieldErrors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="your@email.com"
            />
            <AuthInput
              label="Password"
              value={password}
              onChangeText={handleChangePassword}
              error={fieldErrors.password}
              secureTextEntry
              placeholder="Enter your password"
            />
          </View>

          <TouchableOpacity
            onPress={() => router.push("./forgot-password" as never)}
            disabled={isLoading}
            className="self-end mt-2"
          >
            <Text className="text-accent-green text-sm">Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
            className="bg-accent-green rounded-xl py-3.5 items-center mt-6"
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-text-primary text-base font-semibold">Log In</Text>
            )}
          </TouchableOpacity>

          {error ? <Text className="text-error text-sm text-center mt-3">{error}</Text> : null}

          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-dark-border" />
            <Text className="text-text-muted text-sm mx-4">or</Text>
            <View className="flex-1 h-px bg-dark-border" />
          </View>

          <SocialAuthButtons />

          <View className="flex-row justify-center mt-8">
            <Text className="text-text-secondary text-sm">Don&apos;t have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push("./register" as never)}
              disabled={isLoading}
            >
              <Text className="text-accent-green text-sm font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
