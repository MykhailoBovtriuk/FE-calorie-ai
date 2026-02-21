import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Colors } from "../../constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.darkCard,
          borderTopColor: Colors.darkBorder,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 25,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.textPrimary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hamburger" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              className="w-14 h-14 rounded-full items-center justify-center -mt-5"
              style={{
                backgroundColor: Colors.textMuted,
                transform: [{ scale: 1.15 }],
              }}
            >
              <Ionicons
                name="camera"
                size={28}
                color={focused ? Colors.darkCard : "white"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
