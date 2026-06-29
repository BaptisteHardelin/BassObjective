import axios from "axios";
import type { SongData, SongStatus } from "@/types/song";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function fetchSongs(): Promise<SongData[]> {
  const { data } = await axios.get<SongData[]>(`${API_URL}/song`);
  return data;
}

export async function updateSongStatus(
  songId: string,
  status: SongStatus,
): Promise<void> {
  await axios.patch(`${API_URL}/song/${songId}`, { status });
}
