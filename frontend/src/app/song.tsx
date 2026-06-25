import { View, Text, StyleSheet } from "react-native";

const Song = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Animosity</Text>
        <Text style={styles.text}>The Warning</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 8,
    },
    text: {
        color: '#FFFFFF',
    }
});

export default Song;