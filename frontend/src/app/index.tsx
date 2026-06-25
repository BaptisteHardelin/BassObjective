import { StyleSheet, View, Text, ScrollView } from "react-native";
import KabanColumn from "./kabanColumn";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          alignItems: "center",
        }}
      >
        <KabanColumn name="TODO" />
        <KabanColumn name="DOING" />
        <KabanColumn name="DONE" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#02111B",
    width: "100%",
    height: "100%",
  },
});
