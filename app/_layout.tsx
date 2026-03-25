import { ErrorBoundaryFallback } from "@/components/ErrorBoundaryFallback";
import { GlobalHeader } from "@/components/GlobalHeader";
import { Colors } from "@/constants/colors";
import { useIsWebDesktop } from "@/hooks/useIsWebDesktop";
import { useAuthStore } from "@/store/useAuthStore";
import { Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useState } from "react";
import { Platform, View } from "react-native";
import "../global.css";

export function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  return <ErrorBoundaryFallback error={error} retry={retry} />;
}

export default function RootLayout() {
  const isWebDesktop = useIsWebDesktop();
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, isHydrated, hasCompletedOnboarding, hasSeenVerifyEmail } =
    useAuthStore();
  const navigationState = useRootNavigationState();

  const isAuthScreen = (segments[0] as string) === "(auth)";
  const isModalSubPage =
    segments[0] === "about" || segments[0] === "calorie-calculator" || segments[0] === "review";
  const [isWebReady, setIsWebReady] = useState(Platform.OS !== "web");

  useLayoutEffect(() => {
    if (Platform.OS === "web") setIsWebReady(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !navigationState?.key) return;

    if (!isAuthenticated) {
      if (!isAuthScreen) router.replace("/(auth)/login" as never);
      return;
    }

    if (!hasCompletedOnboarding) {
      if ((segments[1] as string) !== "onboarding") router.replace("/(auth)/onboarding" as never);
      return;
    }

    if (!hasSeenVerifyEmail) {
      if ((segments[1] as string) !== "verify-email")
        router.replace("/(auth)/verify-email" as never);
      return;
    }

    if (isAuthScreen) router.replace("/(tabs)");
  }, [
    isHydrated,
    navigationState?.key,
    isAuthenticated,
    hasCompletedOnboarding,
    hasSeenVerifyEmail,
    segments,
  ]);

  if (!isWebReady || !isHydrated) {
    return <View style={{ flex: 1, backgroundColor: Colors.darkBg }} />;
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: Colors.darkBg }}>
        {!isWebDesktop && !isModalSubPage && !isAuthScreen && <GlobalHeader />}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.darkBg },
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false, animation: "none" }} />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          <Stack.Screen
            name="review"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="meal-detail"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen name="day-view" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false, animation: "none" }} />
          <Stack.Screen
            name="calorie-calculator"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="about"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="error"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </>
  );
}
