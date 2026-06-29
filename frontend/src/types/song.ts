export type SongStatus = "TODO" | "DOING" | "DONE";

export const SONG_STATUSES: SongStatus[] = ["TODO", "DOING", "DONE"];

export type SongData = {
  id: string;
  title: string;
  artist: string;
  status: SongStatus;
};

export type SongPayload = {
  id: string;
  column: SongStatus;
};

export type Columns = Record<SongStatus, SongData[]>;
