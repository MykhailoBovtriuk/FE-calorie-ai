import { useState } from "react";

export function useExpandedMeals(defaultExpanded?: string) {
  const [expandedMeals, setExpandedMeals] = useState<Record<string, boolean>>(
    () => ({
      Breakfast:
        defaultExpanded === undefined ? true : defaultExpanded === "Breakfast",
      Lunch: defaultExpanded === undefined ? true : defaultExpanded === "Lunch",
      Dinner:
        defaultExpanded === undefined ? true : defaultExpanded === "Dinner",
    }),
  );

  const toggleMeal = (mealType: string) => {
    setExpandedMeals((prev) => ({ ...prev, [mealType]: !prev[mealType] }));
  };

  return { expandedMeals, toggleMeal };
}
