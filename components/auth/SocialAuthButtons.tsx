import { AppButton } from "@/components/ui/AppButton";
import { Alert, View } from "react-native";

// TODO: Replace stubs with real OAuth when backend is ready:
// Google → expo-auth-session + POST /auth/google { idToken }
// Apple  → expo-apple-authentication + POST /auth/apple { identityToken }

interface SocialAuthButtonsProps {
  onGooglePress?: () => void;
  onApplePress?: () => void;
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
      <AppButton
        icon="logo-google"
        label="Google"
        variant="outline"
        onPress={handleGoogle}
        className="flex-1 bg-dark-surface"
        textClassName="text-text-primary text-[15px] font-medium"
      />
      <AppButton
        icon="logo-apple"
        label="Apple"
        variant="outline"
        onPress={handleApple}
        className="flex-1 bg-dark-surface"
        textClassName="text-text-primary text-[15px] font-medium"
      />
    </View>
  );
}
