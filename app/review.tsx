import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../components/ui/AppButton";
import { FormField } from "../components/ui/FormField";
import { MacroInput } from "../components/ui/MacroInput";
import { MEAL_ICONS } from "../constants/meals";
import { analyzeImage } from "../services/gemini";
import { useFoodStore } from "../store/useFoodStore";

export default function ReviewScreen() {
  const router = useRouter();
  const {
    imageUri: imageUriParam,
    entryId,
    date,
  } = useLocalSearchParams<{
    imageUri?: string;
    entryId?: string;
    date?: string;
  }>();
  const {
    tempEntry,
    setTempEntry,
    confirmTempEntry,
    updateEntry,
    deleteEntry,
  } = useFoodStore();
  const isEditMode = !!entryId;
  const [localImageUri, setLocalImageUri] = useState<string | undefined>(
    imageUriParam,
  );
  const [scanning, setScanning] = useState(false);

  const handleScan = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission", "Camera access is needed.");
      return;
    }

    let result: ImagePicker.ImagePickerResult;
    try {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.5,
      });
    } catch (e: any) {
      if (e?.message?.includes("Camera not available on simulator")) {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          quality: 0.5,
        });
      } else {
        throw e;
      }
    }

    if (!result.canceled) {
      setScanning(true);
      try {
        const uri = result.assets[0].uri;
        const data = await analyzeImage(uri);
        setTempEntry({
          ...data,
          mealType: tempEntry?.mealType || data.mealType || "Breakfast",
        });
        setLocalImageUri(uri);
      } catch {
        Alert.alert("Error", "Could not analyze food.");
      } finally {
        setScanning(false);
      }
    }
  };

  useEffect(() => {
    if (!tempEntry) {
      router.replace("/");
    }
  }, [tempEntry]);

  if (!tempEntry) {
    return null;
  }

  const handleSave = () => {
    if (!tempEntry.name || tempEntry.name.trim() === "") return;
    if (tempEntry.calories !== undefined && tempEntry.calories < 0) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (isEditMode) {
      updateEntry(entryId!, tempEntry);
      router.back();
    } else {
      confirmTempEntry(date);
      if (date) {
        router.dismiss(2);
      } else {
        router.replace("/");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-bg" edges={["bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-row justify-between items-center p-4 border-b border-dark-border bg-dark-card">
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
          >
            <Text className="text-red-500 text-lg">Cancel</Text>
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            {tempEntry.mealType &&
              MEAL_ICONS[tempEntry.mealType] &&
              React.createElement(MEAL_ICONS[tempEntry.mealType], {
                width: 28,
                height: 28,
              })}
            <Text className="text-text-primary text-lg font-bold">
              {tempEntry.mealType ?? "Review Food"}
            </Text>
          </View>
          <TouchableOpacity onPress={handleScan} disabled={scanning}>
            {scanning ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Ionicons name="camera" size={26} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-5">
          {localImageUri && (
            <View className="mb-5 rounded-2xl overflow-hidden">
              <Image
                source={{ uri: localImageUri }}
                className="w-full h-48"
                resizeMode="cover"
              />
            </View>
          )}

          <FormField
            label="Food Name"
            value={tempEntry.name}
            onChangeText={(t) => setTempEntry({ ...tempEntry, name: t })}
            className="mb-4"
          />

          <View className="flex-row gap-2 mb-4">
            <View className="flex-1">
              <FormField
                label="Calories (kcal)"
                value={tempEntry.calories}
                onChangeText={(t) =>
                  setTempEntry({ ...tempEntry, calories: Number(t) || 0 })
                }
                keyboardType="numeric"
                className="mb-4"
              />
            </View>
            <View className="flex-1">
              <FormField
                label="Weight (g)"
                value={tempEntry.weight}
                onChangeText={(t) =>
                  setTempEntry({ ...tempEntry, weight: Number(t) || 0 })
                }
                keyboardType="numeric"
                className="mb-4"
              />
            </View>
          </View>

          <Text className="text-text-secondary font-bold mb-2 ml-1">
            Macros
          </Text>
          <View className="flex-row justify-between mb-6">
            <MacroInput
              label="Protein"
              value={tempEntry.protein}
              onChange={(v) => setTempEntry({ ...tempEntry, protein: v })}
            />
            <MacroInput
              label="Carbs"
              value={tempEntry.carbs}
              onChange={(v) => setTempEntry({ ...tempEntry, carbs: v })}
            />
            <MacroInput
              label="Fats"
              value={tempEntry.fats}
              onChange={(v) => setTempEntry({ ...tempEntry, fats: v })}
            />
          </View>

          <AppButton
            onPress={handleSave}
            label={isEditMode ? "Save Changes" : "Add"}
          />

          {isEditMode && (
            <AppButton
              onPress={() => {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error,
                );
                deleteEntry(entryId!);
                router.replace("/");
              }}
              label="Delete"
              variant="danger"
              className="mt-3"
            />
          )}

          <View className="h-10" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
