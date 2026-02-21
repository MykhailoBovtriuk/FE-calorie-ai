import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/colors";
import { useFoodStore } from "../store/useFoodStore";

interface DayItemProps {
  label: string;
  dateNumber: number;
  isSelected: boolean;
  isToday: boolean;
  isPast: boolean;
  hasData: boolean;
  calories: number;
  onPress: () => void;
}

export function DayItem({
  label,
  dateNumber,
  isSelected,
  isToday,
  isPast,
  hasData,
  calories,
  onPress,
}: DayItemProps) {
  const calorieLimit = useFoodStore((s) => s.calorieLimit);
  const isOverLimit = calories > calorieLimit;

  let borderColor: string = Colors.textMuted;
  let borderWidth = isSelected ? 3 : 1;

  if (isPast) {
    borderColor = !hasData || isOverLimit ? Colors.error : Colors.accentGreen;
  } else if (isToday) {
    borderColor = hasData && isOverLimit ? Colors.error : Colors.accentGreen;
  }

  return (
    <TouchableOpacity onPress={onPress} className="items-center">
      <View
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ borderWidth, borderColor }}
      >
        {hasData && isOverLimit && (
          <Ionicons name="close" size={16} color={Colors.error} />
        )}
        {hasData && !isOverLimit && (
          <Ionicons name="checkmark" size={16} color={Colors.accentGreen} />
        )}
      </View>

      <Text
        className={`text-s mt-1.5 text-text-muted ${isSelected ? "font-extrabold" : "font-medium"}`}
      >
        {label}
      </Text>
      <Text
        className={`text-xs text-text-muted ${isSelected ? "font-extrabold" : "font-medium"}`}
      >
        {dateNumber}
      </Text>
    </TouchableOpacity>
  );
}
