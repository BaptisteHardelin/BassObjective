import { StyleSheet, View, Text } from 'react-native';
import KabanColumn from './kabanColumn';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <KabanColumn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#02111B",
    width: "100%",
    height: "100%",
  }
});