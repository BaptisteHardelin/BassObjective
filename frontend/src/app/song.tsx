import { View, Text, StyleSheet } from "react-native";

const Song = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.songTitle}>Animosity</Text>
      <Text style={styles.songArtist}>The Warning</Text>
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
});

export default Song;
