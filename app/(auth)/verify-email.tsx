import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyEmailScreen() {
  const { markVerifyEmailSeen, user } = useAuthStore();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-20 h-20 rounded-full bg-accent-green/10 items-center justify-center mb-8">
          <Ionicons name="mail-outline" size={40} color="#4ADE80" />
        </View>

        <Text className="text-text-primary text-3xl font-bold text-center mb-3">
          Check your email
        </Text>
        <Text className="text-text-secondary text-base text-center leading-6">
          We sent a confirmation link to{"\n"}
          <Text className="text-text-primary font-medium">{user?.email}</Text>
        </Text>

        <TouchableOpacity
          onPress={markVerifyEmailSeen}
          activeOpacity={0.8}
          className="bg-accent-green rounded-xl py-3.5 items-center w-full mt-12"
        >
          <Text className="text-text-primary text-base font-semibold">Continue</Text>
        </TouchableOpacity>

        <Text className="text-text-muted text-xs text-center mt-6">
          Didn't receive the email? Check your spam folder.
        </Text>
      </View>
    </SafeAreaView>
  );
}
