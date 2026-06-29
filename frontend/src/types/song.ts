export type SongStatus = "TODO" | "DOING" | "DONE";

export const SONG_STATUSES: SongStatus[] = ["TODO", "DOING", "DONE"];

export type SongData = {
  id: string;
  title: string;
  artist: string;
  status: SongStatus;
  completionDate: string | null;
};

export type SongPayload = {
  id: string;
  column: SongStatus;
};

export type SongCreateDto = {
  title: string;
  artist: string;
};

export type Columns = Record<SongStatus, SongData[]>;
