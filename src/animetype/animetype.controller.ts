import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { Animetype } from './entities/animetype.entity';
import { AnimeTypeService } from './animetype.service';
import { DeleteResult } from 'typeorm';
import { Anime } from 'src/anime/entities/anime.entity';

@Controller('animetype')
export class AnimetypeController {
  constructor(private readonly animeTypeService: AnimeTypeService) {}

  @Get()
  async findAll(): Promise<Animetype[]> {
    return this.animeTypeService.findAll();
  }

  @Post()
  async create(@Body() animeType: Animetype,
    @Body() animetypeData: { animeId: number; generoId: number },
  ): Promise<Animetype> {
    return this.animeTypeService.create(animeType,
      animetypeData.animeId,
      animetypeData.generoId,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatedAnimetype: Partial<Animetype>,
  ): Promise<Animetype> {
    const animetype = await this.animeTypeService.update(id, updatedAnimetype);
    if (!animetype) {
      throw new NotFoundException('Tipo de anime não encontrado');
    }
    return animetype;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Animetype> {
    const animetype = await this.animeTypeService.findOne(id);
    if (!animetype) {
      throw new NotFoundException('Tipo de anime não encontrado');
    }
    return animetype;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.animeTypeService.delete(id);
  }

  @Get('byGenre/:genreId')
  async getAnimesByGenre(@Param('genreId') genreId: number): Promise<Anime[]> {
    return this.animeTypeService.findByGenre(genreId);
  }
}
