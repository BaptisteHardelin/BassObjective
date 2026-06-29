import { useCallback, useEffect, useState } from "react";
import { fetchSongs, markSongAsDone, updateSongStatus } from "@/api/songApi";
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

/** Replaces a song in its column with the version returned by the backend (e.g. completionDate). */
const replaceSong = (columns: Columns, song: SongData): Columns => ({
  ...columns,
  [song.status]: columns[song.status].map((s) =>
    s.id === song.id ? song : s,
  ),
});

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

      // 2. Persist on the backend. Moving to DONE uses the dedicated endpoint
      //    so the backend also stamps the completionDate.
      const persist =
        to === "DONE"
          ? markSongAsDone(songId)
          : updateSongStatus(songId, to);

      persist
        .then((updated) => {
          // Sync with the backend's version (e.g. completionDate).
          setColumns((prev) => replaceSong(prev, updated));
        })
        .catch((error) => {
          // Revert the move if the request fails.
          console.error("Error updating song status:", error);
          setColumns((prev) => moveBetweenColumns(prev, songId, to, from));
        });
    },
    [],
  );

  return { columns, loading, moveSong, reload: loadSongs };
}
