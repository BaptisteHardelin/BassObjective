import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { FindOptionsWhere } from 'typeorm/browser/find-options/FindOptionsWhere.js';
import { ILike } from 'typeorm/browser/find-options/operator/ILike.js';
import { SongStatus } from './entities/SongStatus';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}

  create(createSongDto: CreateSongDto) {
    return this.songRepository.save(createSongDto);
  }

  findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  findOne(id: number): Promise<Song | null> {
    return this.songRepository.findOneBy({ id });
  }

  async findByArtistOrSongName(
    artist?: string | null,
    songName?: string | null,
  ): Promise<Song[]> {
    const query: FindOptionsWhere<Song> = {};

    if (typeof artist === 'string' && artist.trim().length > 0) {
      query.artist = ILike(`%${artist}%`); // Cherche tout ce qui contient la chaîne
    }

    if (typeof songName === 'string' && songName.trim().length > 0) {
      query.title = ILike(`%${songName}%`);
    }

    return await this.songRepository.find({ where: query });
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }

  async update(id: number, updateData: { status: string }): Promise<Song> {
    const song = await this.songRepository.findOneBy({ id });
    if (!song) throw new NotFoundException('Song Not Found');

    Object.assign(song, updateData);

    // Keep completionDate consistent with the status: stamp it when the song
    // becomes done (unless it already has one), clear it otherwise.
    song.completionDate =
      song.status === SongStatus.DONE
        ? (song.completionDate ?? new Date())
        : null;

    return await this.songRepository.save(song);
  }

  async markAsDone(id: number): Promise<Song> {
    const song = await this.songRepository.findOneBy({ id });

    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    song.status = SongStatus.DONE;
    song.completionDate = new Date();

    return await this.songRepository.save(song);
  }
}
