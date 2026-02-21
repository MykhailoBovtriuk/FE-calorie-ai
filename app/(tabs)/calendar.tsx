import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { useFoodStore } from '../../store/useFoodStore';
import { useRouter } from 'expo-router';
import { toLocalISODate } from '../../utils/dates';

export default function CalendarScreen() {
  const router = useRouter();
  const entries = useFoodStore((s) => s.entries);
  const calorieLimit = useFoodStore((s) => s.calorieLimit);
  const todayISO = toLocalISODate(new Date());

  const caloriesPerDate: Record<string, number> = {};
  for (const [dateKey, meals] of Object.entries(entries)) {
    caloriesPerDate[dateKey] = [...meals.breakfast, ...meals.lunch, ...meals.dinner].reduce(
      (sum, e) => sum + e.calories,
      0
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: Colors.darkBg }}>
      <Calendar
        style={{ backgroundColor: Colors.darkBg }}
        theme={{
          backgroundColor: Colors.darkBg,
          calendarBackground: Colors.darkBg,
          textSectionTitleColor: Colors.textSecondary,
          arrowColor: Colors.textMuted,
          monthTextColor: Colors.textPrimary,
          textMonthFontWeight: 'bold',
          textMonthFontSize: 16,
          textDayHeaderFontWeight: '600',
          textDayHeaderFontSize: 12,
        }}
        dayComponent={({ date, state }) => {
          if (!date) return null;

          const isOtherMonth = state === 'disabled';
          const isToday = date.dateString === todayISO;
          const isPast = date.dateString < todayISO;

          const calories = caloriesPerDate[date.dateString] ?? 0;
          const hasData = date.dateString in caloriesPerDate;
          const isOverLimit = calories > calorieLimit;

          // Mirror DayItem border logic
          let borderColor: string = Colors.darkBorder;
          let borderWidth = 1;

          if (!isOtherMonth) {
            if (isPast) {
              borderColor = !hasData || isOverLimit ? Colors.error : Colors.accentGreen;
            } else if (isToday) {
              borderColor = hasData && isOverLimit ? Colors.error : Colors.accentGreen;
            }
          }

          return (
            <TouchableOpacity
              onPress={() => !isOtherMonth && router.push({ pathname: '/day-view', params: { date: date.dateString } })}
              activeOpacity={0.7}
              style={{ alignItems: 'center', paddingVertical: 6 }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: isOtherMonth ? 0 : borderWidth,
                  borderColor: isOtherMonth ? 'transparent' : borderColor,
                }}
              >
                <Text
                  style={{
                    color: isOtherMonth ? Colors.placeholder : Colors.textPrimary,
                    fontSize: 14,
                    fontWeight: '500',
                  }}
                >
                  {date.day}
                </Text>
              </View>
              <View
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: isToday ? Colors.textPrimary : 'transparent',
                  marginTop: 3,
                }}
              />
            </TouchableOpacity>
          );
        }}
        firstDay={1}
        onDayPress={(day) => router.push({ pathname: '/day-view', params: { date: day.dateString } })}
      />
    </SafeAreaView>
  );
}
