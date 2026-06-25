import { Text, View, StyleSheet, ScrollView } from "react-native";
import Song from "./song";

type kanbanColumNName = {
  name: string;
};

const KabanColumn = (props: kanbanColumNName) => {
  return (
    <View style={styles.columnContainer}>
      <Text style={styles.columnTitle}>{props.name}</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Song />
      </ScrollView>
    </View>
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
    height: 600,
  },
  columnTitle: {
    color: "#F5FBEF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
});

export default KabanColumn;
