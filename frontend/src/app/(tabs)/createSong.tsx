import { addSong } from "@/api/songApi";
import { SongCreateDto } from "@/types/song";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateSongScreen() {
  const router = useRouter();
  const { control, handleSubmit, reset, watch } = useForm<SongCreateDto>({
    defaultValues: { title: "", artist: "" },
  });

  const title = watch("title");
  const artist = watch("artist");
  const isButtonDisabled = !title || !artist;

  const onSubmit = async (data: SongCreateDto) => {
    try {
      await addSong(data);
      reset();
      router.navigate("/");
    } catch (error) {
      console.error("Error creating song:", error);
      Alert.alert("Error", "Could not create the song. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a song</Text>

      <Text style={styles.label}>Titre</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Ex: Animosity"
            placeholderTextColor="#8899A6"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Artiste</Text>
      <Controller
        control={control}
        name="artist"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Ex: The Warning"
            placeholderTextColor="#8899A6"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#02111B",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F5FBEF",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    color: "#A0B0C0",
    marginBottom: 8,
    marginLeft: 5,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#1E2A38",
    color: "#F5FBEF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3A4B5C",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#2C3E50",
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
