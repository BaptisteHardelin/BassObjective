import { PrimaryGeneratedColumn } from 'typeorm/browser/decorator/columns/PrimaryGeneratedColumn.js';
import { Entity } from 'typeorm/browser/decorator/entity/Entity.js';
import { SongStatus } from './SongStatus';
import { Column } from 'typeorm/browser/decorator/columns/Column.js';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  artist!: string;

  @Column({ type: 'simple-enum', enum: SongStatus, default: SongStatus.TODO })
  status: SongStatus = SongStatus.TODO;

  @Column({ type: 'datetime', nullable: true })
  completionDate: Date | null = null;

  constructor(id: number, title: string, artist: string) {
    this.id = id;
    this.title = title;
    this.artist = artist;
  }
}
