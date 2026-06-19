import { SongStatus } from './SongStatus';

export class Song {
  id!: string;
  title!: string;
  artist!: string;
  status: SongStatus = SongStatus.TODO;
  completionDate: Date | null = null;

  constructor(id: string, title: string, artist: string) {
    this.id = id;
    this.title = title;
    this.artist = artist;
  }
}
