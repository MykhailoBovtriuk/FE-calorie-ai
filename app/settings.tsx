import { DesktopPageCard } from "@/components/DesktopPageCard";
import { Colors } from "@/constants/colors";
import { useIsWebDesktop } from "@/hooks/useIsWebDesktop";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
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
  return (
    <View className="bg-dark-card rounded-xl divide-y divide-dark-border m-2.5">
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
