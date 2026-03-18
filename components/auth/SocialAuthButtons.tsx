import { Ionicons } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/colors";

// TODO: Replace stubs with real OAuth when backend is ready:
// Google → expo-auth-session + POST /auth/google { idToken }
// Apple  → expo-apple-authentication + POST /auth/apple { identityToken }

interface SocialAuthButtonsProps {
  onGooglePress?: () => void;
  onApplePress?: () => void;
}

function SocialButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-xl border border-dark-border bg-dark-surface"
    >
      <Ionicons name={icon} size={20} color={Colors.textPrimary} />
      <Text className="text-text-primary text-[15px] font-medium">{label}</Text>
    </TouchableOpacity>
  );
}

export function SocialAuthButtons({ onGooglePress, onApplePress }: SocialAuthButtonsProps) {
  const handleGoogle = () => {
    onGooglePress?.();
    Alert.alert("Coming Soon", "Google sign-in will be available soon.");
  };

  const handleApple = () => {
    onApplePress?.();
    Alert.alert("Coming Soon", "Apple sign-in will be available soon.");
  };

  return (
    <View className="flex-row gap-3">
      <SocialButton icon="logo-google" label="Google" onPress={handleGoogle} />
      <SocialButton icon="logo-apple" label="Apple" onPress={handleApple} />
    </View>
  );
}
