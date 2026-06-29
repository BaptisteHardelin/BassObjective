import { Tabs } from "expo-router";

export default function BassObjectiveTab() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="createSong" options={{ title: "Create Song" }} />
      <Tabs.Screen name="index" options={{ title: "Todo Song" }} />
    </Tabs>
  );
}
