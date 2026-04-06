# Calorie AI

AI-powered food tracking mobile app. Snap a photo of your meal and instantly get calories, protein, fats, and carbs powered by Google Gemini Vision.

## Tech Stack

- **React Native 0.81** + **Expo 54** (bare workflow, new architecture)
- **expo-router** — file-based routing
- **Zustand** + AsyncStorage — state management and persistence
- **NativeWind 4** — Tailwind CSS for React Native, dark theme
- **Google Gemini 1.5 Flash** — food image analysis
- **Zod** — data validation
- **react-native-reanimated** — animations
- **TypeScript** strict mode

## Requirements

- Node.js 18+
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- iOS: macOS + Xcode 15+
- Android: Android Studio + Android SDK 34+
- Google Gemini API key — get one at [Google AI Studio](https://aistudio.google.com/app/apikey)

## Local Setup

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd calorie-ai
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and paste your Gemini API key:

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

> The `EXPO_PUBLIC_` prefix is required — Expo only injects variables with this prefix into client-side code.

### 3. Start the dev server

```bash
# Start Expo dev server (opens QR code)
npm start

# Or target a specific platform directly:
npm run ios       # iOS simulator (macOS only)
npm run android   # Android emulator
npm run web       # Browser
```

### 4. Run on a physical device

1. Install **Expo Go** from the App Store / Google Play
2. Run `npm start`
3. Scan the QR code from the terminal

> On a physical iOS device, make sure you're on the same Wi-Fi network, or use the `--tunnel` flag.

## Project Structure

```
app/
  _layout.tsx          # Root Stack + StatusBar
  (tabs)/              # Bottom tab navigation
    index.tsx          # Home screen (dashboard)
    camera.tsx         # Camera / gallery trigger
    calendar.tsx       # Entry calendar
  review.tsx           # Scan review modal screen
  meal-detail.tsx      # Meal detail view

components/            # UI components
hooks/                 # useCameraScan, etc.
services/
  gemini.ts            # Gemini API integration
store/
  useFoodStore.ts      # Zustand store
types/
  food.ts              # FoodEntry type + Zod schemas
```

## AI Flow

```
Photo → base64 → Gemini Flash → JSON → tempEntry → /review → confirmTempEntry() → store
```

1. User taps the Camera tab → ImagePicker opens
2. Photo is converted to base64 and sent to Gemini with a nutritionist prompt
3. Response is parsed as JSON → stored as `tempEntry`
4. On the `/review` screen the user can edit values — confirming saves the entry to the persisted store

## Production Build

```bash
# EAS Build (recommended)
npm install -g eas-cli
eas login
eas build --platform ios      # or android
```

Before building, make sure `bundleIdentifier` (iOS) and `package` (Android) are set in `app.json`.
