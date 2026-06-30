import { StyleSheet, Text, View } from "react-native";
import type { SongData } from "@/types/song";

/** Formats an ISO date string as DD/MM/YYYY. */
const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/** Presentational song card, shared by the list item and the drag overlay. */
const SongCard = ({ song }: { song: SongData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.songTitle}>{song.title}</Text>
      <Text style={styles.songArtist}>{song.artist}</Text>
      {song.completionDate && (
        <Text style={styles.completionDate}>
          Done on {formatDate(song.completionDate)}
        </Text>
      )}
    </View>
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
  completionDate: {
    color: "#cf5f34",
    fontSize: 12,
    marginTop: 6,
  },
});

export default SongCard;
