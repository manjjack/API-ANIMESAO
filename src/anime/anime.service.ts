import { Injectable, Inject } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult, Like } from 'typeorm';
import { Anime } from './entities/anime.entity';

@Injectable()
export class AnimeService {
  constructor(
    @Inject('ANIME_REPOSITORY')
    private repository: Repository<Anime>,
  ) {}

  async findAll(): Promise<Anime[]> {
    return this.repository.find();
  }

  async create(anime: Anime): Promise<Anime> {
    return this.repository.save(anime);
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.repository.delete(id);
    return resultado;
  }

  async update(id: number, updatedAnime: Partial<Anime>): Promise<Anime> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedAnime,
    );

    if (updateResult.affected === 0) {
      throw new Error('Anime não encontrado ou a atualização falhou');
    }
    const anime: Anime = await this.repository.findOne({
      where: {
        animeId: id,
      },
    });

    return anime;
  }

  async findOne(id: number): Promise<Anime> {
    return await this.repository.findOne({
      where: {
        animeId: id,
      },
    });
  }

  async findByName(name: string): Promise<Anime[]> {
    return this.repository.find({
      where: {
        titulo: Like(`%${name}%`), // Usa Like para pesquisa parcial
      },
    });
  }
}
