import { Text, TouchableOpacity, View } from "react-native";
import { LIFESTYLE_OPTIONS, type LifestyleType } from "@/types/auth";

interface LifestyleRadioGroupProps {
  value?: LifestyleType;
  onChange: (value: LifestyleType) => void;
}

export function LifestyleRadioGroup({ value, onChange }: LifestyleRadioGroupProps) {
  return (
    <View className="gap-2">
      {LIFESTYLE_OPTIONS.map((option) => {
        const isSelected = value === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
            className={`flex-row items-center gap-3 p-4 rounded-xl border ${
              isSelected
                ? "border-accent-green bg-accent-green/10"
                : "border-dark-border bg-dark-surface"
            }`}
          >
            <View
              className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                isSelected ? "border-accent-green" : "border-text-muted"
              }`}
            >
              {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-accent-green" />}
            </View>
            <View className="flex-1">
              <Text
                className={`text-[15px] font-medium ${
                  isSelected ? "text-accent-green" : "text-text-primary"
                }`}
              >
                {option.label}
              </Text>
              <Text className="text-text-muted text-xs mt-0.5">{option.description}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
