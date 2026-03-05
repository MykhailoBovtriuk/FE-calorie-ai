import { useRouter } from "expo-router";
import { useFoodStore } from "@/store/useFoodStore";
import type { FoodEntry } from "@/types/food";

export function useEditEntry(source?: string) {
  const router = useRouter();
  const { setTempEntry, setNavSource } = useFoodStore();
  return (entry: FoodEntry) => {
    setTempEntry(entry);
    if (source) setNavSource(source);
    router.push({ pathname: "/review", params: { entryId: entry.id } });
  };
}
