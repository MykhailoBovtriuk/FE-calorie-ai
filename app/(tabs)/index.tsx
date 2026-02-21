import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFoodStore } from '../../store/useFoodStore';
import { TodayCard } from '../../components/TodayCard';
import { MealSection } from '../../components/MealSection';
import { useActiveMealPeriod } from '../../hooks/useActiveMealPeriod';
import { useExpandedMeals } from '../../hooks/useExpandedMeals';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { FoodEntry } from '../../types/food';
import { MEAL_ORDER, createEmptyEntry } from '../../constants/meals';

export default function Dashboard() {
  const router = useRouter();
  const { getEntriesForDate, getDatesWithEntries, deleteEntry, setTempEntry, getCaloriesPerDate } = useFoodStore();
  const { activeMealType, scaleFactors } = useActiveMealPeriod();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { expandedMeals, toggleMeal } = useExpandedMeals(activeMealType);

  const caloriesPerDate = getCaloriesPerDate();

  const dateEntries = getEntriesForDate(selectedDate);
  const datesWithEntries = getDatesWithEntries();

  const groupedEntries = dateEntries.reduce(
    (acc, entry) => {
      const meal = entry.mealType;
      if (!acc[meal]) acc[meal] = [];
      acc[meal].push(entry);
      return acc;
    },
    {} as Record<string, FoodEntry[]>
  );

  const totals = dateEntries.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fats: acc.fats + item.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const handleEditEntry = (entry: FoodEntry) => {
    setTempEntry(entry);
    router.push({ pathname: '/review', params: { entryId: entry.id } });
  };

  return (
    <View className="flex-1 bg-dark-bg">
      <SafeAreaView className="flex-1" edges={['bottom']}>
        <ScrollView className="px-5 pt-4">
          <TodayCard
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            datesWithEntries={datesWithEntries}
            caloriesPerDate={caloriesPerDate}
            {...totals}
          />

          {MEAL_ORDER.map((mealType) => {
            const mealEntries = groupedEntries[mealType] || [];
            const hasEntries = mealEntries.length > 0;

            return (
              <MealSection
                key={mealType}
                mealType={mealType}
                entries={mealEntries}
                expanded={hasEntries && (expandedMeals[mealType] ?? true)}
                scale={scaleFactors[mealType as keyof typeof scaleFactors]}
                onHeaderPress={() => {
                  if (hasEntries) {
                    toggleMeal(mealType);
                  } else {
                    setTempEntry(createEmptyEntry(mealType as FoodEntry['mealType']));
                    router.push({ pathname: '/review' });
                  }
                }}
                onAddPress={() => {
                  setTempEntry(createEmptyEntry(mealType as FoodEntry['mealType']));
                  router.push({ pathname: '/review' });
                }}
                onDeleteEntry={deleteEntry}
                onEditEntry={handleEditEntry}
              />
            );
          })}

          <View className="h-6" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
