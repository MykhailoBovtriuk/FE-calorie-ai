import { AppButton } from "@/components/ui/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { Colors } from "@/constants/colors";

type Props = {
  error: Error;
  retry: () => void;
};

export function ErrorBoundaryFallback({ error, retry }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      <View className="flex-1 items-center justify-center px-8 gap-4">
        <Ionicons name="warning" size={56} color={Colors.error} />
        <Text className="text-xl font-bold text-text-primary text-center">
          Something went wrong
        </Text>
        <Text className="text-sm text-text-secondary text-center">{error.message}</Text>
        <AppButton
          label="Try Again"
          variant="outline"
          onPress={retry}
          className="mt-2 px-12"
          textClassName="text-lg"
        />
      </View>
    </SafeAreaView>
  );
}
