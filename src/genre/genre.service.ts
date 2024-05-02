import { Injectable, Inject } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @Inject('GENRE_REPOSITORY')
    private repository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return this.repository.find();
  }

  async create(genre: Genre): Promise<Genre> {
    return this.repository.save(genre);
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.repository.delete(id);
    return resultado;
  }

  async update(id: number, updatedGenre: Partial<Genre>): Promise<Genre> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedGenre,
    );

    if (updateResult.affected === 0) {
      throw new Error('Anime não encontrado ou a atualização falhou');
    }
    const genre: Genre = await this.repository.findOne({
      where: {
        generoId: id,
      },
    });

    return genre;
  }

  async findOne(id: number): Promise<Genre> {
    return await this.repository.findOne({
      where: {
        generoId: id,
      },
    });
  }


}
