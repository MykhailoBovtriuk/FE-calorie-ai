import type {
  AuthResponse,
  LoginPayload,
  RegisterStep1Payload,
  RegisterStep2Payload,
  User,
} from "@/types/auth";
// TODO: uncomment when backend is ready
// import { apiClient } from "@/utils/apiClient";

const MOCK_DELAY = 800;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: "mock-user-1",
    email: "test@test.com",
    name: "Test User",
    ...overrides,
  };
}

function createMockAuthResponse(user: User): AuthResponse {
  return {
    user,
    accessToken: "mock-access-token",
    refreshToken: "mock-refresh-token",
  };
}

// --- MOCK implementations (replace with real API calls when backend is ready) ---

export async function loginRequest(payload: LoginPayload): Promise<AuthResponse> {
  // TODO: return apiClient.post("/auth/login", payload).then((r) => r.data);
  await delay(MOCK_DELAY);
  const user = createMockUser({ email: payload.email });
  return createMockAuthResponse(user);
}

export async function registerRequest(payload: RegisterStep1Payload): Promise<AuthResponse> {
  // TODO: return apiClient.post("/auth/register", payload).then((r) => r.data);
  await delay(MOCK_DELAY);
  const user = createMockUser({ email: payload.email, name: payload.name });
  return createMockAuthResponse(user);
}

export async function updateProfileRequest(payload: RegisterStep2Payload): Promise<User> {
  // TODO: return apiClient.patch("/users/me", payload).then((r) => r.data);
  await delay(MOCK_DELAY);
  return createMockUser(payload);
}

export async function logoutRequest(): Promise<void> {
  // TODO: return apiClient.post("/auth/logout").then(() => undefined);
  await delay(MOCK_DELAY);
}

export async function resetPasswordRequest(_email: string): Promise<void> {
  // TODO: return apiClient.post("/auth/forgot-password", { email }).then(() => undefined);
  await delay(MOCK_DELAY);
}

export async function googleSignInRequest(): Promise<AuthResponse> {
  // TODO: implement with expo-auth-session + apiClient.post("/auth/google", { idToken })
  throw new Error("Google Sign-In is not yet implemented");
}

export async function appleSignInRequest(): Promise<AuthResponse> {
  // TODO: implement with expo-apple-authentication + apiClient.post("/auth/apple", { identityToken })
  throw new Error("Apple Sign-In is not yet implemented");
}
