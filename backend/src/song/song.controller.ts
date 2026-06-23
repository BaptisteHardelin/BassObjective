import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songService.create(createSongDto);
  }

  @Get('search')
  findByArtistOrSongName(
    @Query('artist') artist?: string,
    @Query('songName') songName?: string,
  ) {
    const filterArtist = typeof artist === 'string' ? artist : null;
    const filterSongName = typeof songName === 'string' ? songName : null;

    return this.songService.findByArtistOrSongName(
      filterArtist,
      filterSongName,
    );
  }

  @Get()
  findAll() {
    return this.songService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) return;
    return this.songService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songService.remove(+id);
  }
}
