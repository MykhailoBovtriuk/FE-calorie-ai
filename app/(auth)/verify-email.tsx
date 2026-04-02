import { AppButton } from "@/components/ui/AppButton";
import { useIsWebDesktop } from "@/hooks/useIsWebDesktop";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyEmailScreen() {
  const isWebDesktop = useIsWebDesktop();
  const { markVerifyEmailSeen, user } = useAuthStore();

  const content = (
    <>
      <View className="w-20 h-20 rounded-full bg-accent-green/10 items-center justify-center mb-8 self-center">
        <Ionicons name="mail-outline" size={40} color="#4ADE80" />
      </View>

      <Text className="text-text-primary text-3xl font-bold text-center mb-3">
        Check your email
      </Text>
      <Text className="text-text-secondary text-base text-center leading-6">
        We sent a confirmation link to{"\n"}
        <Text className="text-text-primary font-medium">{user?.email}</Text>
      </Text>

      <AppButton label="Continue" onPress={markVerifyEmailSeen} className="mt-12 w-full" />

      <Text className="text-text-muted text-xs text-center mt-6">
        Didn&apos;t receive the email? Check your spam folder.
      </Text>
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
          <View className="p-8">{content}</View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center px-8">{content}</View>
    </SafeAreaView>
  );
}
