import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, UpdateResult, Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { Anime } from 'src/anime/entities/anime.entity';

@Injectable()
export class RatingService {
  constructor(
    @Inject('RATING_REPOSITORY')
    private repository: Repository<Rating>,
    @Inject("ANIME_REPOSITORY")
    private readonly animeRepository: Repository<Anime>,
  ) {}
  async create(idAnime: number, idUser: number): Promise<Rating> {
    // Cria uma nova instância de Animestype com os IDs do anime e do genero
    const rating = new Rating();
    rating.animeId = idAnime;
    rating.userId = idUser;

    // Salva o objeto AnimeType no banco de dados
    return this.repository.save(rating);
  }

  async update(id: number, updatedAnimetype: Partial<Rating>): Promise<Rating> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedAnimetype,
    );

    if (updateResult.affected === 0) {
      throw new Error('Usuário não encontrado ou a atualização falhou');
    }
    const rating: Rating = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    return rating;
  }

  async findOne(id: number): Promise<Rating> {
    return await this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.repository.delete(id);
    return resultado;
  }

  async calculateRanking(): Promise<Anime[]> {
    const animeWithRatings = await this.animeRepository
      .createQueryBuilder('anime')
      .leftJoinAndSelect('anime.ratings', 'rating')
      .loadRelationCountAndMap('anime.ratingCount', 'anime.ratings')
      .addSelect('AVG(rating.rating)', 'averageRating')
      .groupBy('anime.animeId')
      .orderBy('averageRating', 'DESC')
      .getMany();

    return animeWithRatings;
  }

  async findRatingAnime(idAnime:number, idUser:number): Promise<Rating>{
    return await this.repository.findOne({
      where:{
        animeId : idAnime,
        userId : idUser
      }
    });

  }
}
