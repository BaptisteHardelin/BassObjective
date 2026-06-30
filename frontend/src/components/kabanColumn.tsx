import { StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import Song from "./song";
import { useDragBoard } from "@/components/dnd/DragBoard";
import type { SongData, SongStatus } from "@/types/song";

type KabanColumnProps = {
  name: SongStatus;
  songs: SongData[];
};

const KabanColumn = ({ name, songs }: KabanColumnProps) => {
  const { columnRefs, overColumn } = useDragBoard();

  // Highlight the column while a card is hovering over it.
  const style = useAnimatedStyle(() => ({
    borderColor: overColumn.value === name ? "#cf5f34" : "#3A3A3C",
  }));

  return (
    <Animated.View
      ref={columnRefs[name]}
      style={[styles.columnContainer, style]}
    >
      <Text style={styles.columnTitle}>{name}</Text>
      {songs.map((song) => (
        <Song key={song.id} song={song} column={name} />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    alignSelf: "center",
    marginTop: 16,
    backgroundColor: "#102636",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3A3A3C",
    marginHorizontal: 8,
    padding: 16,
    width: "90%",
    minHeight: 200,
  },
  columnTitle: {
    color: "#F5FBEF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
});

export default KabanColumn;
