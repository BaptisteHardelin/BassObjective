import { useCallback, useEffect, useState } from "react";
import { fetchSongs, updateSongStatus } from "@/api/songApi";
import type { Columns, SongData, SongStatus } from "@/types/song";

const EMPTY_COLUMNS: Columns = { TODO: [], DOING: [], DONE: [] };

const groupByStatus = (songs: SongData[]): Columns => ({
  TODO: songs.filter((s) => s.status === "TODO"),
  DOING: songs.filter((s) => s.status === "DOING"),
  DONE: songs.filter((s) => s.status === "DONE"),
});

/** Moves a song from one column to another. Pure function: used for both the move and the rollback. */
const moveBetweenColumns = (
  columns: Columns,
  songId: string,
  from: SongStatus,
  to: SongStatus,
): Columns => {
  const song = columns[from].find((s) => s.id === songId);
  if (!song) return columns;

  return {
    ...columns,
    [from]: columns[from].filter((s) => s.id !== songId),
    [to]: [...columns[to], { ...song, status: to }],
  };
};

export function useSongBoard() {
  const [columns, setColumns] = useState<Columns>(EMPTY_COLUMNS);
  const [loading, setLoading] = useState(true);

  const loadSongs = useCallback(async () => {
    setLoading(true);
    try {
      setColumns(groupByStatus(await fetchSongs()));
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSongs();
  }, [loadSongs]);

  const moveSong = useCallback(
    (songId: string, from: SongStatus, to: SongStatus) => {
      if (from === to) return;

      // 1. Optimistic update: the UI moves the song right away.
      setColumns((prev) => moveBetweenColumns(prev, songId, from, to));

      // 2. Persist on the backend; revert the move if the request fails.
      updateSongStatus(songId, to).catch((error) => {
        console.error("Error updating song status:", error);
        setColumns((prev) => moveBetweenColumns(prev, songId, to, from));
      });
    },
    [],
  );

  return { columns, loading, moveSong, reload: loadSongs };
}
