import { z } from 'zod';

const FoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fats: z.number(),
  weight: z.number(),
  mealType: z.enum(['Breakfast', 'Lunch', 'Dinner']),
  timestamp: z.number(),
});

export type FoodEntry = z.infer<typeof FoodSchema>;

export interface DayMeals {
  breakfast: FoodEntry[];
  lunch: FoodEntry[];
  dinner: FoodEntry[];
}
