import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  updateProfileRequest,
} from "@/services/auth";
import { useFoodStore } from "@/store/useFoodStore";
import type { LoginPayload, RegisterStep1Payload, RegisterStep2Payload, User } from "@/types/auth";
import { tokenStorage } from "@/utils/tokenStorage";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isHydrated: boolean;
  hasCompletedOnboarding: boolean;
  hasSeenVerifyEmail: boolean;
}

interface AuthActions {
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterStep1Payload) => Promise<void>;
  completeOnboarding: (payload: RegisterStep2Payload) => Promise<void>;
  skipOnboarding: () => void;
  markVerifyEmailSeen: () => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isHydrated: false,
      hasCompletedOnboarding: false,
      hasSeenVerifyEmail: false,

      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await loginRequest(payload);
          await tokenStorage.saveTokens(res.accessToken, res.refreshToken);
          set({
            user: res.user,
            isAuthenticated: true,
            hasCompletedOnboarding: true,
            hasSeenVerifyEmail: true,
          });
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : "Login failed";
          set({ error: message });
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await registerRequest(payload);
          await tokenStorage.saveTokens(res.accessToken, res.refreshToken);
          set({
            user: res.user,
            isAuthenticated: true,
            hasCompletedOnboarding: false,
            hasSeenVerifyEmail: false,
          });
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : "Registration failed";
          set({ error: message });
        } finally {
          set({ isLoading: false });
        }
      },

      completeOnboarding: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const updatedUser = await updateProfileRequest(payload);
          set({
            user: { ...get().user, ...updatedUser },
            hasCompletedOnboarding: true,
          });
        } catch (e: unknown) {
          const message = e instanceof Error ? e.message : "Failed to update profile";
          set({ error: message });
        } finally {
          set({ isLoading: false });
        }
      },

      skipOnboarding: () => set({ hasCompletedOnboarding: true }),

      markVerifyEmailSeen: () => set({ hasSeenVerifyEmail: true }),

      logout: async () => {
        try {
          await logoutRequest();
        } catch {
          // proceed with local logout even if request fails
        }
        await tokenStorage.clearTokens();
        useFoodStore.getState().clearEntries();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          hasCompletedOnboarding: false,
          hasSeenVerifyEmail: false,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        hasSeenVerifyEmail: state.hasSeenVerifyEmail,
      }),
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ isHydrated: true });
      },
    },
  ),
);
