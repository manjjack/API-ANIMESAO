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
import { SlideshowService } from './slideshow.service';
import { Slideshow } from './entities/slideshow.entity';

@Controller('slideshow')
export class SlideshowController {
  constructor(private readonly slideshowService: SlideshowService) {}

  @Get()
  async findAll(): Promise<Slideshow[]> {
    return this.slideshowService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Slideshow> {
    const slideshow = await this.slideshowService.findOne(+id);
    if (!slideshow) {
      throw new NotFoundException('SlideShow não encontrado');
    }
    return slideshow;
  }

  @Post()
  async create(
    @Body() slideshow: Slideshow,
    @Body('animeId') idAnime: number,
  ): Promise<Slideshow> {
    slideshow.animeId = idAnime;
    return this.slideshowService.create(slideshow, idAnime);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedSlideshow: Partial<Slideshow>,
  ): Promise<Slideshow> {
    const slideshow = await this.slideshowService.update(+id, updatedSlideshow);
    if (!slideshow) {
      throw new NotFoundException(
        'SlideShow não encontrado ou a atualização falhou',
      );
    }
    return slideshow;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const deleteResult = await this.slideshowService.delete(+id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException('SlideShow não encontrado');
    }
  }
}
