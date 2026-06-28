import { Stack } from "expo-router";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Bass Objective",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#02111B" },
          headerTitleStyle: { color: "#F5FBEF" },
        }}
      />
    </Stack>
  );
}
