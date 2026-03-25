import { DesktopPageCard } from "@/components/DesktopPageCard";
import { Colors } from "@/constants/colors";
import { useIsWebDesktop } from "@/hooks/useIsWebDesktop";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function SettingsRow({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3.5 px-4"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={22} color={Colors.textPrimary} style={{ marginRight: 16 }} />
      <Text className="flex-1 text-text-primary text-[15px] font-medium">{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

function SettingsContent({ showAbout }: { showAbout: boolean }) {
  const router = useRouter();
  const { logout } = useAuthStore();

  const doLogout = async () => {
    await logout();
    router.replace("/(auth)/login" as never);
  };

  const handleLogout = () => {
    if (Platform.OS === "web") {
      void doLogout();
      return;
    }
    Alert.alert("Log Out", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => void doLogout() },
    ]);
  };

  return (
    <View className="gap-2.5 m-2.5">
      <View className="bg-dark-card rounded-xl divide-y divide-dark-border">
        <SettingsRow
          icon="calculator"
          label="Calorie Calculator"
          onPress={() => router.push("/calorie-calculator")}
        />
        {showAbout && (
          <SettingsRow
            icon="information-circle"
            label="About"
            onPress={() => router.push("/about")}
          />
        )}
      </View>

      <View className="bg-dark-card rounded-xl">
        <TouchableOpacity
          className="flex-row items-center py-3.5 px-4"
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color={Colors.error}
            style={{ marginRight: 16 }}
          />
          <Text className="flex-1 text-error text-[15px] font-medium">Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const isWebDesktop = useIsWebDesktop();

  if (isWebDesktop) {
    return (
      <DesktopPageCard>
        <SettingsContent showAbout />
      </DesktopPageCard>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-dark-bg">
      <SettingsContent showAbout={false} />
    </SafeAreaView>
  );
}
