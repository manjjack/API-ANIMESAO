import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { Anime } from './entities/anime.entity';
import { DeleteResult } from 'typeorm';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get()
  async findAll(): Promise<Anime[]> {
    return this.animeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Anime> {
    return this.animeService.findOne(id);
  }

  @Post()
  async create(@Body() anime: Anime): Promise<Anime> {
    return this.animeService.create(anime);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatedCardapio: Partial<Anime>,
  ): Promise<Anime> {
    return this.animeService.update(id, updatedCardapio);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.animeService.delete(id);
  }

  @Get('search/:name')
  async findByName(@Param('name') name: string): Promise<Anime[]> {
    return this.animeService.findByName(name);
  }
}
