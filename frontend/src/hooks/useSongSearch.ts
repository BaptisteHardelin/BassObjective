import { useEffect, useState } from "react";
import { searchSongs } from "@/api/songApi";
import type { SongData } from "@/types/song";

/** Merges two song lists, dropping duplicates by id. */
const mergeUnique = (a: SongData[], b: SongData[]): SongData[] => {
  const merged = [...a];
  for (const song of b) {
    if (!merged.some((s) => s.id === song.id)) merged.push(song);
  }
  return merged;
};

/**
 * Debounced song search from a single query, matching the title OR the artist.
 * The backend ANDs its two filters, so we run a title search and an artist
 * search and merge them to get OR semantics. An empty query returns all songs.
 */
export function useSongSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SongData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const timeout = setTimeout(async () => {
      try {
        const term = query.trim();
        const songs = term
          ? mergeUnique(
              ...(await Promise.all([
                searchSongs("", term),
                searchSongs(term, ""),
              ])),
            )
          : await searchSongs("", "");
        if (!cancelled) setResults(songs);
      } catch (error) {
        console.error("Error searching songs:", error);
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  return { query, setQuery, results, loading };
}
