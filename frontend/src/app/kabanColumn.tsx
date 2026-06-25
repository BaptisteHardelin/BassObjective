import { Text, View, StyleSheet } from "react-native";
import Song from "./song";

const KabanColumn = () => {
  return (
    <View style={styles.columnContainer}>
      <Text style={styles.columnTitle}>TODO</Text>
      <Song />
    </View>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    backgroundColor: "#000000",
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    width: 300,
  },
  columnTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  columnSong: {},
});

export default KabanColumn;
