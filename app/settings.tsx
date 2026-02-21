import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../constants/colors";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      edges={["bottom"]}
      className="flex-1 bg-dark-bg"
    >
      <View className="flex-1 px-4 pt-4">
        <TouchableOpacity
          className="flex-row items-center bg-dark-card rounded-xl py-3.5 px-4"
          onPress={() => router.push("/calorie-calculator")}
          activeOpacity={0.7}
        >
          <Ionicons name="calculator" size={22} color={Colors.textPrimary} style={{ marginRight: 16 }} />
          <Text className="flex-1 text-text-primary text-[15px] font-medium">Calorie Calculator</Text>
          <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
