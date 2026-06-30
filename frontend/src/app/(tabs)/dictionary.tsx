import { useSongSearch } from "@/hooks/useSongSearch";
import { Ionicons } from "@expo/vector-icons";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function DictionaryScreen() {
  const { query, setQuery, results, removeSong } = useSongSearch();

  const confirmDelete = (id: string, title: string) => {
    Alert.alert("Delete song", `Delete "${title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removeSong(id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Songs</Text>

      <TextInput
        style={styles.input}
        placeholder="Search by title or artist"
        placeholderTextColor="#8899A6"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<Text style={styles.empty}>No songs found.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardArtist}>{item.artist}</Text>
              <Text style={styles.cardStatus}>{item.status}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmDelete(item.id, item.title)}
              hitSlop={8}
            >
              <Ionicons name="trash-outline" size={22} color="#8899A6" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#02111B",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F5FBEF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1E2A38",
    color: "#F5FBEF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#3A4B5C",
    fontSize: 16,
  },
  list: {
    paddingVertical: 16,
  },
  empty: {
    color: "#8899A6",
    textAlign: "center",
    marginTop: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E2A38",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#3A4B5C",
  },
  cardContent: {
    flex: 1,
  },
  deleteButton: {
    paddingLeft: 12,
  },
  cardTitle: {
    color: "#F5FBEF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardArtist: {
    color: "#A0B0C0",
    fontSize: 14,
    marginTop: 4,
  },
  cardStatus: {
    color: "#3498db",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
