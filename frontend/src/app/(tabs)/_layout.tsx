import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function BassObjectiveTab() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3498db",
        tabBarInactiveTintColor: "#8899A6",
        tabBarStyle: {
          backgroundColor: "#02111B",
          borderTopColor: "#3A4B5C",
        },
      }}
    >
      <Tabs.Screen
        name="createSong"
        options={{
          title: "Create Song",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Todo Song",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: "All Song",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
