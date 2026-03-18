import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, type TextInputProps, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/colors";

interface AuthInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  placeholder?: string;
}

export function AuthInput({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  placeholder,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="gap-1.5">
      <Text className="text-text-secondary text-sm font-medium">{label}</Text>
      <View
        className={`flex-row items-center bg-dark-surface rounded-xl border ${
          error ? "border-error" : "border-dark-border"
        }`}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry && !showPassword}
          className="flex-1 text-text-primary px-4 py-3.5 text-[15px]"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)} className="pr-4" hitSlop={8}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text className="text-error text-xs">{error}</Text> : null}
    </View>
  );
}
