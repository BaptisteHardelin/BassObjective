import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import KabanColumn from "@/components/kabanColumn";
import DragBoard from "@/components/dnd/DragBoard";
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
      <View style={styles.container}>
        <DragBoard
          onDropSong={moveSong}
          contentContainerStyle={{
            paddingBottom: 20,
            alignItems: "center",
          }}
        >
          {SONG_STATUSES.map((status) => (
            <KabanColumn key={status} name={status} songs={columns[status]} />
          ))}
        </DragBoard>
      </View>
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
