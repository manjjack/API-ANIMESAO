import { Injectable, Inject , NotFoundException} from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult} from 'typeorm';
import { Episode } from './entities/episode.entity';
import { Anime } from 'src/anime/entities/anime.entity';

@Injectable()
export class EpisodeService {
  constructor(
    @Inject('EPISODE_REPOSITORY')
    private repository: Repository<Episode>,
    @Inject('ANIME_REPOSITORY')
    private animeRepository: Repository<Anime>,
  ) {}

  async findAll(): Promise<Episode[]> {
    return this.repository.find();
  }

  async create(episode: Episode, idAnime: number): Promise<Episode> {
    episode.animeId = idAnime;
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

  async findEpisodesByAnimeAndSeason(
    animeId: number,
    seasonNumber: number,
  ): Promise<Episode[]> {
    try {
      const episodes = await this.repository
        .createQueryBuilder('episode')
        .leftJoinAndSelect('episode.anime', 'anime')
        .where('anime.animeId = :animeId', { animeId })
        .andWhere('episode.numeroDaTemporada = :seasonNumber', { seasonNumber })
        .getMany();

      return episodes;
    } catch (error) {
      throw error;
    }
  }

  async findEpisodesByAnimeId(animeId: number): Promise<Episode[]> {
    return this.repository.find({
      where: {
        animeId: animeId,
      },
    });
  }

  async findEpisodesByAnimeName(animeName: string): Promise<Episode[]> {
    // Procura pelo anime com o nome fornecido
    const anime = await this.animeRepository.findOne({ where: { titulo: animeName } });
    
    if (!anime) {
      // Se o anime não existir, lança uma exceção de não encontrado
      throw new NotFoundException('Anime não encontrado');
    }

    // Procura por episódios relacionados ao anime encontrado
    return this.repository.find({ where: { animeId: anime.animeId } });
  }
}
