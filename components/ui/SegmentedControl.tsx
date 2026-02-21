import { Text, TouchableOpacity, View } from "react-native";

interface SegmentedControlProps<T extends string> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  labels?: Partial<Record<T, string>>;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  labels,
  className = "",
}: SegmentedControlProps<T>) {
  return (
    <View className={`flex-row bg-dark-card rounded-[10px] p-1 gap-1 ${className}`}>
      {options.map((option) => {
        const isSelected = value === option;
        return (
          <TouchableOpacity
            key={option}
            className={`flex-1 py-2 rounded-lg items-center${isSelected ? " border border-white" : ""}`}
            onPress={() => onChange(option)}
            activeOpacity={0.8}
          >
            <Text
              className={
                isSelected
                  ? "text-white text-sm font-medium"
                  : "text-text-muted text-sm font-medium"
              }
            >
              {labels?.[option] ?? option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
