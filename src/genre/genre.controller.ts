import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';
import { DeleteResult } from 'typeorm';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @Post()
  async create(@Body() genre: Genre): Promise<Genre> {
    return this.genreService.create(genre);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatedGenre: Partial<Genre>,
  ): Promise<Genre> {
    return this.genreService.update(id, updatedGenre);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.genreService.delete(id);
  }
}
