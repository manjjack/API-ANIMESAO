import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { Rating } from './entities/rating.entity';
import { Anime } from 'src/anime/entities/anime.entity';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() rating: Rating, @Body('animeId') animeId: number, @Body('userId') userId: number): Promise<Rating> {
    return this.ratingService.create(rating,animeId, userId);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatedRating: Partial<Rating>): Promise<Rating> {
    return this.ratingService.update(id, updatedRating);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Rating> {
    return this.ratingService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.ratingService.delete(id);
  }

  @Get()
  async calculateRanking(): Promise<Anime[]> {
    return this.ratingService.calculateRanking();
  }

  @Get(':idAnime/:idUser')
  async findRatingAnime(
    @Param('idAnime') idAnime: number,
    @Param('idUser') idUser: number,
  ): Promise<Rating> {
    return this.ratingService.findRatingAnime(idAnime, idUser);
  }
}
