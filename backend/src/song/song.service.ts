import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongService {
  create(createSongDto: CreateSongDto) {
    return 'This action adds a new song';
  }

  findAll() {
    return `This action returns all song`;
  }

  findOne(id: number) {
    return `This action returns a #${id} song`;
  }

  findByArtistOrSongName(artist?: string, songName?: string) {
    return `This action returns songs by artist: ${artist} or song name: ${songName}`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
