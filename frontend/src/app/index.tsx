import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { DraxProvider } from "react-native-drax";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import KabanColumn from "./kabanColumn";
import { SongData } from "./song";

type ColumnName = "TODO" | "DOING" | "DONE";
type Columns = Record<ColumnName, SongData[]>;

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const COLUMN_ORDER: ColumnName[] = ["TODO", "DOING", "DONE"];

const INITIAL_COLUMNS: Columns = {
  TODO: [],
  DOING: [],
  DONE: [],
};

export default function HomeScreen() {
  const [columns, setColumns] = useState<Columns>(INITIAL_COLUMNS);
  const [loading, setLoading] = useState<boolean>(true);

  const loadAllSongs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/song`);
      const allSongs: SongData[] = response.data;

      const newColumns: Columns = {
        TODO: allSongs.filter((s) => s.status === "TODO"),
        DOING: allSongs.filter((s) => s.status === "DOING"),
        DONE: allSongs.filter((s) => s.status === "DONE"),
      };

      setColumns(newColumns);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllSongs();
  }, []);

  const moveSong = (songId: string, fromColumn: string, toColumn: string) => {
    if (fromColumn === toColumn) return;

    setColumns((prev) => {
      const from = fromColumn as ColumnName;
      const to = toColumn as ColumnName;
      const song = prev[from].find((s) => s.id === songId);
      if (!song) return prev;

      return {
        ...prev,
        [from]: prev[from].filter((s) => s.id !== songId),
        [to]: [...prev[to], song],
      };
    });
  };

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
            {COLUMN_ORDER.map((name) => (
              <KabanColumn
                key={name}
                name={name}
                songs={columns[name]}
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
