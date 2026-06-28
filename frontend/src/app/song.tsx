import { Text, StyleSheet } from "react-native";
import { DraxView } from "react-native-drax";

export type SongData = {
  id: string;
  title: string;
  artist: string;
  status: "TODO" | "DOING" | "DONE";
};

export type SongPayload = {
  id: string;
  column: string;
};

type SongProps = {
  song: SongData;
  column: string;
};

const Song = ({ song, column }: SongProps) => {
  return (
    <DraxView
      style={styles.container}
      draggingStyle={styles.dragging}
      dragReleasedStyle={styles.dragging}
      hoverDraggingStyle={styles.hoverDragging}
      longPressDelay={150}
      payload={{ id: song.id, column } satisfies SongPayload}
    >
      <Text style={styles.songTitle}>{song.title}</Text>
      <Text style={styles.songArtist}>{song.artist}</Text>
    </DraxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A3B4D",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#2D5B73",
  },
  dragging: {
    opacity: 0.3,
  },
  hoverDragging: {
    borderColor: "#cf5f34",
  },
  songTitle: {
    color: "#F5FBEF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  songArtist: {
    color: "#F5FBEF",
    opacity: 0.7,
    fontSize: 14,
  },
});

export default Song;
