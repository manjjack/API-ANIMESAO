import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';
import { DeleteResult } from 'typeorm';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async findAll(): Promise<Favorite[]> {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Favorite> {
    return this.favoriteService.findOne(+id);
  }

  @Post()
  async create(
    @Body('animeId') animeId: number,
    @Body('userId') userId: number,
  ): Promise<Favorite> {
    return this.favoriteService.create(animeId, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedFavorite: Partial<Favorite>,
  ): Promise<Favorite> {
    return this.favoriteService.update(+id, updatedFavorite);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.favoriteService.delete(+id);
  }
}
