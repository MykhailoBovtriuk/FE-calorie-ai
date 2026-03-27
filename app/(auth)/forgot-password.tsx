import { AuthInput } from "@/components/auth/AuthInput";
import { AppButton } from "@/components/ui/AppButton";
import { resetPasswordRequest } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSend = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(trimmed)) {
      setError("Invalid email format");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await resetPasswordRequest(trimmed);
      setSubmitted(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <AppButton
        label="Back"
        variant="link"
        icon="chevron-back"
        onPress={() => router.back()}
        className="px-6 pt-4 pb-2"
        textClassName="text-text-secondary text-base"
      />

      <View className="flex-1 px-6 pt-8">
        <Text className="text-text-primary text-3xl font-bold mb-2">Reset password</Text>
        <Text className="text-text-secondary text-base mb-8">
          Enter your email and we'll send you a reset link
        </Text>

        {submitted ? (
          <View className="bg-dark-card rounded-xl p-5 items-center gap-3">
            <Ionicons name="checkmark-circle-outline" size={40} color="#4ADE80" />
            <Text className="text-text-primary text-base font-medium text-center">
              If an account exists with this email, we sent a reset link
            </Text>
          </View>
        ) : (
          <>
            <AuthInput
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (error) setError(null);
              }}
              error={error ?? undefined}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="your@email.com"
            />

            <AppButton
              label="Send reset link"
              onPress={handleSend}
              disabled={isLoading}
              loading={isLoading}
              className="mt-6"
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
