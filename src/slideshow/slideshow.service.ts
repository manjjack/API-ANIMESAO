import { Inject, Injectable } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Slideshow } from './entities/slideshow.entity';

@Injectable()
export class SlideshowService {
  constructor(
    @Inject('SLIDESHOW_REPOSITORY')
    private repository: Repository<Slideshow>,
  ) {}

  async findAll(): Promise<Slideshow[]> {
    return this.repository.find();
  }

  async create(slideShow: Slideshow, idAnime: number): Promise<Slideshow> {
    slideShow.animeId = idAnime;
    return this.repository.save(slideShow);
  }

  async update(
    id: number,
    updatedSlideShow: Partial<Slideshow>,
  ): Promise<Slideshow> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedSlideShow,
    );

    if (updateResult.affected === 0) {
      throw new Error('SlideShow não encontrado ou a atualização falhou');
    }
    const slideShow: Slideshow = await this.repository.findOne({
      where: {
        slideId: id,
      },
    });
    return slideShow;
  }

  async findOne(id: number): Promise<Slideshow> {
    return await this.repository.findOne({
      where: {
        slideId: id,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.repository.delete(id);
    return resultado;
  }
}
