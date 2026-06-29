import { Text, StyleSheet } from "react-native";
import { DraxView } from "react-native-drax";
import Song, { SongData, SongPayload } from "./song";
import type { SongStatus } from "@/types/song";

type KabanColumnProps = {
  name: SongStatus;
  songs: SongData[];
  onDropSong: (
    songId: string,
    fromColumn: SongStatus,
    toColumn: SongStatus,
  ) => void;
};

const KabanColumn = ({ name, songs, onDropSong }: KabanColumnProps) => {
  return (
    <DraxView
      style={styles.columnContainer}
      receivingStyle={styles.receiving}
      onReceiveDragDrop={({ dragged }) => {
        const payload = dragged.payload as SongPayload;
        onDropSong(payload.id, payload.column, name);
      }}
    >
      <Text style={styles.columnTitle}>{name}</Text>
      {songs.map((song) => (
        <Song key={song.id} song={song} column={name} />
      ))}
    </DraxView>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    alignSelf: "center",
    marginTop: 16,
    backgroundColor: "#102636",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3A3A3C",
    marginHorizontal: 8,
    padding: 16,
    width: "90%",
    minHeight: 200,
  },
  receiving: {
    borderColor: "#cf5f34",
    borderWidth: 2,
  },
  columnTitle: {
    color: "#F5FBEF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
});

export default KabanColumn;
