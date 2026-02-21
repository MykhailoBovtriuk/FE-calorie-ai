import { Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";

interface MacroInputProps {
  label: string;
  unit?: string;
  value: number | undefined;
  onChange: (value: number) => void;
  className?: string;
}

export function MacroInput({
  label,
  unit = "g",
  value,
  onChange,
  className = "",
}: MacroInputProps) {
  return (
    <View className={`flex-1 bg-dark-surface p-3 rounded-xl border border-dark-border items-center mx-1 ${className}`}>
      <Text className="text-text-muted text-[10px] font-bold uppercase mb-1">
        {label} ({unit})
      </Text>
      <TextInput
        className="text-xl font-bold text-text-primary text-center"
        value={value?.toString()}
        onChangeText={(text) => onChange(Number(text) || 0)}
        keyboardType="numeric"
        placeholderTextColor={Colors.placeholder}
      />
    </View>
  );
}
