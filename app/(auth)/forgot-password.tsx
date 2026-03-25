import { AuthInput } from "@/components/auth/AuthInput";
import { resetPasswordRequest } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
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
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center px-6 pt-4 pb-2 gap-1"
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={22} color="#A0A0B0" />
        <Text className="text-text-secondary text-base">Back</Text>
      </TouchableOpacity>

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

            <TouchableOpacity
              onPress={handleSend}
              disabled={isLoading}
              activeOpacity={0.8}
              className="bg-accent-green rounded-xl py-3.5 items-center mt-6"
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-text-primary text-base font-semibold">Send reset link</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
