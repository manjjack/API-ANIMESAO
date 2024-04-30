import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { Episode } from './entities/episode.entity';
import { DeleteResult } from 'typeorm';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  async findAll(): Promise<Episode[]> {
    return this.episodeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Episode> {
    return this.episodeService.findOne(+id);
  }

  @Post()
  async create(
    @Body() episode: Episode,
    @Body('animeId') idAnime: number,
  ): Promise<Episode> {
    episode.animeId = idAnime;
    return this.episodeService.create(episode, idAnime);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedEpisode: Partial<Episode>,
  ): Promise<Episode> {
    return this.episodeService.update(+id, updatedEpisode);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.episodeService.delete(+id);
  }

  

  @Get('anime/:animeId')
  async findEpisodesByAnimeId(@Param('animeId') animeId: string): Promise<Episode[]> {
    return this.episodeService.findEpisodesByAnimeId(parseInt(animeId));
  }

  @Get(':animeId/seasons/:seasonNumber')
  async findEpisodesByAnimeAndSeason(
    @Param('animeId') animeId: number,
    @Param('seasonNumber') seasonNumber: number,
  ): Promise<Episode[]> {
    return await this.episodeService.findEpisodesByAnimeAndSeason(animeId, seasonNumber);
  }
}
