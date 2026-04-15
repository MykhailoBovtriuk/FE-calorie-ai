import { apiClient } from "@/utils/apiClient";
import type { FoodEntry } from "@/types/food";

export interface CalendarDay {
  date: string;
  totalCalories: number;
}

export async function fetchEntriesByDate(date: string): Promise<FoodEntry[]> {
  return apiClient.get("/food-entries/", { params: { date } }).then((r) => r.data);
}

export async function createEntry(entry: Omit<FoodEntry, "id">, date: string): Promise<FoodEntry> {
  return apiClient.post("/food-entries/", { ...entry, date }).then((r) => r.data);
}

export async function updateEntry(
  id: string,
  data: Partial<FoodEntry> & { date?: string },
): Promise<FoodEntry> {
  return apiClient.put(`/food-entries/${id}`, data).then((r) => r.data);
}

export async function deleteEntry(id: string): Promise<void> {
  return apiClient.delete(`/food-entries/${id}`).then(() => undefined);
}

export async function fetchCalendar(month: string): Promise<CalendarDay[]> {
  return apiClient.get("/food-entries/calendar", { params: { month } }).then((r) => r.data);
}

export async function fetchDatesWithEntries(): Promise<string[]> {
  return apiClient.get("/food-entries/dates").then((r) => r.data);
}
