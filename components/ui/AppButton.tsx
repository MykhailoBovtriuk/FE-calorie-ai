import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";

type ButtonVariant = "primary" | "outline" | "danger" | "link";

interface AppButtonProps {
  label: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  style?: ViewStyle;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-green rounded-xl py-3.5",
  outline: "border border-dark-border rounded-xl py-3.5",
  danger: "bg-red-600 rounded-xl py-3.5",
  link: "",
};

const variantTextStyles: Record<ButtonVariant, string> = {
  primary: "text-text-primary text-base font-semibold",
  outline: "text-text-secondary text-base",
  danger: "text-white text-base font-semibold",
  link: "text-accent-green text-sm font-semibold",
};

export function AppButton({
  label,
  onPress,
  icon,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  textClassName = "",
  style,
}: AppButtonProps) {
  const iconColor = variant === "link" ? Colors.accentGreen : Colors.textPrimary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`items-center flex-row justify-center gap-2 ${variantStyles[variant]} ${className}`}
      activeOpacity={variant === "link" ? 0.6 : 0.8}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} />
      ) : icon ? (
        <Ionicons name={icon} size={20} color={iconColor} />
      ) : null}
      <Text className={`${variantTextStyles[variant]} ${textClassName}`}>{label}</Text>
    </TouchableOpacity>
  );
}
