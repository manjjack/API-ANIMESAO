import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Episode } from './entities/episode.entity';

@Injectable()
export class EpisodeService {
  constructor(
    @Inject('EPISODE_REPOSITORY')
    private repository: Repository<Episode>,
  ) {}

  async findAll(): Promise<Episode[]> {
    return this.repository.find();
  }

  async create(idAnime: number): Promise<Episode> {
    // Cria uma nova instância de Animestype com os IDs do anime e do genero
    const episode = new Episode();
    episode.animeId = idAnime;

    // Salva o objeto AnimeType no banco de dados
    return this.repository.save(episode);
  }

  async update(id: number, updatedEpisode: Partial<Episode>): Promise<Episode> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedEpisode,
    );

    if (updateResult.affected === 0) {
      throw new Error('Usuário não encontrado ou a atualização falhou');
    }
    const episode: Episode = await this.repository.findOne({
      where: {
        episodioId: id,
      },
    });
    return episode;
  }

  async findOne(id: number): Promise<Episode> {
    return await this.repository.findOne({
      where: {
        episodioId: id,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.repository.delete(id);
    return resultado;
  }
}
