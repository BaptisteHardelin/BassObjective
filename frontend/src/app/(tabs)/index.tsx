import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { DraxProvider } from "react-native-drax";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import KabanColumn from "@/components/kabanColumn";
import { useSongBoard } from "@/hooks/useSongBoard";
import { SONG_STATUSES } from "@/types/song";

export default function HomeScreen() {
  const { columns, moveSong, reload } = useSongBoard();

  // Refresh the board every time the tab regains focus (e.g. after creating a song).
  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DraxProvider>
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
              alignItems: "center",
            }}
          >
            {SONG_STATUSES.map((status) => (
              <KabanColumn
                key={status}
                name={status}
                songs={columns[status]}
                onDropSong={moveSong}
              />
            ))}
          </ScrollView>
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#02111B",
    width: "100%",
    height: "100%",
  },
});
