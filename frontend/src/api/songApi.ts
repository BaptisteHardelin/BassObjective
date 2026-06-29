import axios from "axios";
import type { SongCreateDto, SongData, SongStatus } from "@/types/song";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function fetchSongs(): Promise<SongData[]> {
  const { data } = await axios.get<SongData[]>(`${API_URL}/song`);
  return data;
}

export async function updateSongStatus(
  songId: string,
  status: SongStatus,
): Promise<SongData> {
  const { data } = await axios.patch<SongData>(`${API_URL}/song/${songId}`, {
    status,
  });
  return data;
}

/**
 * Marks a song as done. Unlike updateSongStatus, the backend also stamps
 * the song's completionDate (PATCH /song/:id/done). Returns the updated song.
 */
export async function markSongAsDone(songId: string): Promise<SongData> {
  const { data } = await axios.patch<SongData>(
    `${API_URL}/song/${songId}/done`,
  );
  return data;
}

export async function addSong(song: SongCreateDto): Promise<SongData> {
  const { data } = await axios.post<SongData>(`${API_URL}/song`, {
    title: song.title,
    artist: song.artist,
  });

  return data;
}
