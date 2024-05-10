import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
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

  @Get('status/:status')
  async findByStatus(@Param('status') status: string): Promise<Anime[]> {
    return this.animeService.findByStatus(status);
  }

  @Get('ano/:ano')
  async findByAno(@Param('ano') ano: number): Promise<Anime[]> {
    return this.animeService.findByYear(ano);
  }

  @Get('rating/:rating')
  async findByRating(@Param('rating') rating: number): Promise<Anime[]> {
    return this.animeService.findByRating(rating);
  }

  @Get('genero/:genero')
  async findByGenero(@Param('genero') genero: string): Promise<Anime[]> {
    return this.animeService.findByGenero(genero);
  }

  @Get('filter/:status/:genero/:audio/:ano')
  async filterAnimes(
    @Param('status') status?: string,
    @Param('genero') genero?: string,
    @Param('audio') audio?: string,
    @Param('ano') ano?: number,
  ): Promise<Anime[]> {
    return this.animeService.filterAnimes2(status, genero, audio, ano);
  }

  @Get('genero/:genero/audio/:audio')
  async findByGenreAndRating(
    @Param('genero') genero: string,
    @Param('audio') audio: string,
  ): Promise<Anime[]> {
    return this.animeService.findByGenreAndAudio(genero, audio);
  }

  @Get('all/:status/:ano/:genero/:rating')
  async findByStatusYearGenreAndRating(
    @Param('status') status: string,
    @Param('ano') ano: number,
    @Param('genero') genero: string,
    @Param('audio') audio: string,
  ): Promise<Anime[]> {
    return this.animeService.findByStatusYearGenreAndAudio(
      status,
      ano,
      genero,
      audio,
    );
  }

  @Get('initial/:initialLetter')
  async findAnimesByInitialLetter(
    @Param('initialLetter') initialLetter: string,
  ): Promise<Anime[]> {
    return this.animeService.findAnimesByInitialLetter(initialLetter);
  }

  @Get('/findByStatusAndYear/:status/:ano')
  async findByStatusAndYear(
    @Param('status') status: string,
    @Param('ano', ParseIntPipe) ano: number,
  ): Promise<Anime[]> {
    return this.animeService.findByStatusAndYear(status, ano);
  }
  
  // animes do ano 
  @Get('recent/:anoAtual')
  async findRecentAnimesOfYear(
    @Param('anoAtual') ano: number,
  ): Promise<Anime[]> {
    return this.animeService.findAllAnimesOfYear(ano);
  }

  @Get('movies/:aux')
  async findAllMovies( @Param('aux') aux: string): Promise<Anime[]> {
    return this.animeService.findAllMovies(aux);
  }

  @Get('destaque/:aux')
  async findAnimesDestaque(@Param('aux') aux: string): Promise<Anime[]> {
    return this.animeService.animeEmDestaque(aux);
  }
}
