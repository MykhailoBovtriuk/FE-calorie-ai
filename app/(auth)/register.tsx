import { AuthInput } from "@/components/auth/AuthInput";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { AppButton } from "@/components/ui/AppButton";
import { useAuthStore } from "@/store/useAuthStore";
import { RegisterFormSchema } from "@/types/auth";
import { useIsWebDesktop } from "@/hooks/useIsWebDesktop";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const router = useRouter();
  const isWebDesktop = useIsWebDesktop();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, setter: (v: string) => void) => (text: string) => {
    setter(text);
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    if (error) clearError();
  };

  const handleRegister = async () => {
    const result = RegisterFormSchema.safeParse({ name, email, password, confirmPassword });
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
    await register({
      name: result.data.name,
      email: result.data.email,
      password: result.data.password,
    });
  };

  const formBody = (
    <>
      <View className="items-center mb-10">
        <Text className="text-text-primary text-3xl font-bold">Create Account</Text>
        <Text className="text-text-secondary text-base mt-2">Start tracking your nutrition</Text>
      </View>

      <View className="gap-4">
        <AuthInput
          label="Name"
          value={name}
          onChangeText={handleChange("name", setName)}
          error={fieldErrors.name}
          placeholder="Your name"
        />
        <AuthInput
          label="Email"
          value={email}
          onChangeText={handleChange("email", setEmail)}
          error={fieldErrors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="your@email.com"
        />
        <AuthInput
          label="Password"
          value={password}
          onChangeText={handleChange("password", setPassword)}
          error={fieldErrors.password}
          secureTextEntry
          placeholder="At least 6 characters"
        />
        <AuthInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={handleChange("confirmPassword", setConfirmPassword)}
          error={fieldErrors.confirmPassword}
          secureTextEntry
          placeholder="Repeat your password"
        />
      </View>

      <AppButton
        label="Create Account"
        onPress={handleRegister}
        disabled={isLoading}
        loading={isLoading}
        className="mt-6"
      />

      {error ? <Text className="text-error text-sm text-center mt-3">{error}</Text> : null}

      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-dark-border" />
        <Text className="text-text-muted text-sm mx-4">or</Text>
        <View className="flex-1 h-px bg-dark-border" />
      </View>

      <SocialAuthButtons />

      <View className="flex-row justify-center mt-8">
        <Text className="text-text-secondary text-sm">Already have an account? </Text>
        <AppButton
          label="Log In"
          variant="link"
          onPress={() => router.back()}
          disabled={isLoading}
        />
      </View>
    </>
  );

  if (isWebDesktop) {
    return (
      <View
        className="flex-1 bg-dark-bg items-center justify-center"
        style={{ paddingVertical: 50 }}
      >
        <View
          className="bg-dark-card rounded-2xl border border-dark-border"
          style={{ width: 440, maxHeight: "100%" }}
        >
          <ScrollView
            contentContainerClassName="p-8"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {formBody}
          </ScrollView>
        </View>
      </View>
    );
  }

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
          {formBody}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
