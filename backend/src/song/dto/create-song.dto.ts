import { SongStatus } from '../entities/SongStatus';

export class CreateSongDto {
  title!: string;
  artist!: string;
  status: SongStatus = SongStatus.TODO;
  completionDate: Date | null = null;
}
