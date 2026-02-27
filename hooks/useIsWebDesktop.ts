import { Platform } from "react-native";
import { useState, useEffect } from "react";

const DESKTOP_BREAKPOINT = 1024;

export function useIsWebDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      return window.innerWidth >= DESKTOP_BREAKPOINT;
    }
    return false;
  });

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const handleResize = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}
