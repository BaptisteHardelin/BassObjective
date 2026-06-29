import { Tabs } from "expo-router";

export default function BassObjectiveTab() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "TODO" }} />
    </Tabs>
  );
}
