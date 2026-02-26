import { Text, View, TouchableOpacity, Platform, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../constants/colors";
import { NavSidebar } from "../components/NavSidebar";

export default function SettingsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWebDesktop = Platform.OS === "web" && width >= 1024;

  const content = (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-dark-bg">
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

  if (isWebDesktop) {
    return (
      <View className="flex-1 flex-row bg-dark-bg">
        <NavSidebar />
        {content}
      </View>
    );
  }

  return content;
}
