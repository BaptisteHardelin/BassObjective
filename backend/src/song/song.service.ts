import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';

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

  findByArtistOrSongName(artist?: string, songName?: string) {
    return `This action returns songs by artist: ${artist} or song name: ${songName}`;
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }
}
