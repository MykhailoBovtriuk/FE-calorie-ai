import { apiClient } from "@/utils/apiClient";
import type {
  AuthResponse,
  LoginPayload,
  RegisterStep1Payload,
  RegisterStep2Payload,
} from "@/types/auth";

export async function loginRequest(payload: LoginPayload): Promise<AuthResponse> {
  return apiClient.post("/auth/login", payload).then((r) => r.data);
}

export async function registerRequest(payload: RegisterStep1Payload): Promise<AuthResponse> {
  return apiClient.post("/auth/register", payload).then((r) => r.data);
}

export async function updateProfileRequest(
  payload: RegisterStep2Payload,
): Promise<AuthResponse["user"]> {
  return apiClient.patch("/users/me", payload).then((r) => r.data);
}

export async function logoutRequest(): Promise<void> {
  return apiClient.post("/auth/logout").then(() => undefined);
}

export async function resetPasswordRequest(email: string): Promise<void> {
  return apiClient.post("/auth/forgot-password", { email }).then(() => undefined);
}

export async function googleSignInRequest(): Promise<AuthResponse> {
  // TODO: implement with expo-auth-session + apiClient.post("/auth/google", { idToken })
  throw new Error("Google Sign-In is not yet implemented");
}

export async function appleSignInRequest(): Promise<AuthResponse> {
  // TODO: implement with expo-apple-authentication + apiClient.post("/auth/apple", { identityToken })
  throw new Error("Apple Sign-In is not yet implemented");
}
