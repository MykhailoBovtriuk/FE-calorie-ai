import { DesktopPageCard } from "@/components/DesktopPageCard";
import { AppButton } from "@/components/ui/AppButton";
import { Colors } from "@/constants/colors";
import { useIsWebDesktop } from "@/hooks/useIsWebDesktop";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="text-text-muted text-xs font-semibold uppercase tracking-wider">
        {title}
      </Text>
      <View className="bg-dark-card rounded-xl px-4 py-3.5 gap-1">{children}</View>
    </View>
  );
}

function AboutContent() {
  return (
    <ScrollView contentContainerClassName="p-4 gap-4" showsVerticalScrollIndicator={false}>
      <Section title="Developer">
        <Text className="text-text-primary text-[15px] font-medium">Mykhailo Bovtriuk</Text>
      </Section>

      <Section title="Food AI Image Analysis">
        <Text className="text-text-primary text-[15px] font-medium">Google Gemini 2.0 Flash</Text>
      </Section>

      <Section title="Data Sources">
        <Text className="text-text-primary text-[15px] font-medium">Open Food Facts</Text>
        <Text className="text-text-muted text-[13px] leading-5">
          Food database provided by Open Food Facts{"\n"}Licensed under Open Database License (ODbL)
          v1.0
        </Text>
        <AppButton
          label="openfoodfacts.org"
          variant="link"
          onPress={() => Linking.openURL("https://openfoodfacts.org")}
          textClassName="text-blue-500 text-[13px]"
        />
      </Section>
    </ScrollView>
  );
}

export default function AboutScreen() {
  const router = useRouter();
  const isWebDesktop = useIsWebDesktop();

  const header = (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-dark-border">
      {isWebDesktop ? (
        <View className="w-9" />
      ) : (
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-dark-surface items-center justify-center"
        >
          <Ionicons name="close" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      )}
      <Text className="text-text-primary text-[17px] font-semibold">About</Text>
      <View className="w-9" />
    </View>
  );

  if (isWebDesktop) {
    return (
      <DesktopPageCard>
        {header}
        <AboutContent />
      </DesktopPageCard>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dark-bg" edges={["top", "bottom"]}>
      {header}
      <AboutContent />
    </SafeAreaView>
  );
}
