import { AuthInput } from "@/components/auth/AuthInput";
import { LifestyleRadioGroup } from "@/components/auth/LifestyleRadioGroup";
import { useIsWebDesktop } from "@/hooks/useIsWebDesktop";
import { useAuthStore } from "@/store/useAuthStore";
import { OnboardingFormSchema, type LifestyleType } from "@/types/auth";
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

export default function OnboardingScreen() {
  const isWebDesktop = useIsWebDesktop();
  const { completeOnboarding, skipOnboarding, isLoading, error, clearError } = useAuthStore();

  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [lifestyle, setLifestyle] = useState<LifestyleType | undefined>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, setter: (v: string) => void) => (text: string) => {
    setter(text);
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    if (error) clearError();
  };

  const handleNext = async () => {
    const result = OnboardingFormSchema.safeParse({ phone, age, weight, lifestyle });
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
    const { data } = result;
    await completeOnboarding({
      phone: data.phone || undefined,
      age: data.age,
      weight: data.weight,
      lifestyle: data.lifestyle,
    });
  };

  const formBody = (
    <>
      <View className="items-center mb-10">
        <Text className="text-text-primary text-3xl font-bold">Complete your profile</Text>
        <Text className="text-text-secondary text-base mt-2 text-center">
          This helps us personalize your experience
        </Text>
      </View>

      <View className="gap-4">
        <AuthInput
          label="Phone (optional)"
          value={phone}
          onChangeText={handleChange("phone", setPhone)}
          error={fieldErrors.phone}
          keyboardType="phone-pad"
          placeholder="+1 234 567 8900"
        />
        <AuthInput
          label="Age (optional)"
          value={age}
          onChangeText={handleChange("age", setAge)}
          error={fieldErrors.age}
          keyboardType="numeric"
          placeholder="25"
        />
        <AuthInput
          label="Weight in kg (optional)"
          value={weight}
          onChangeText={handleChange("weight", setWeight)}
          error={fieldErrors.weight}
          keyboardType="numeric"
          placeholder="70"
        />
        <View>
          <Text className="text-text-secondary text-sm mb-2">Activity level (optional)</Text>
          <LifestyleRadioGroup value={lifestyle} onChange={setLifestyle} />
        </View>
      </View>

      {error ? <Text className="text-error text-sm text-center mt-4">{error}</Text> : null}

      <View className="gap-3 mt-8">
        <TouchableOpacity
          onPress={handleNext}
          disabled={isLoading}
          activeOpacity={0.8}
          className="bg-accent-green rounded-xl py-3.5 items-center"
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-text-primary text-base font-semibold">Next</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={skipOnboarding}
          disabled={isLoading}
          activeOpacity={0.8}
          className="rounded-xl py-3.5 items-center border border-dark-border"
        >
          <Text className="text-text-secondary text-base">Skip for now</Text>
        </TouchableOpacity>
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
