import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject('FAVORITE_REPOSITORY')
    private repository: Repository<Favorite>,
  ) {}

  async findAll(): Promise<Favorite[]> {
    return this.repository.find();
  }

  async create(favorite: Favorite,idAnime: number, idUser: number): Promise<Favorite> {
    // Cria uma nova instância de Animestype com os IDs do anime e do genero
    favorite.animeId = idAnime;
    favorite.userId = idUser;

    // Salva o objeto AnimeType no banco de dados
    return this.repository.save(favorite);
  }

  async update(
    id: number,
    updatedFavorite: Partial<Favorite>,
  ): Promise<Favorite> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedFavorite,
    );

    if (updateResult.affected === 0) {
      throw new Error('Usuário não encontrado ou a atualização falhou');
    }
    const favorite: Favorite = await this.repository.findOne({
      where: {
        favoritosId: id,
      },
    });
    return favorite;
  }

  async findOne(id: number): Promise<Favorite> {
    return await this.repository.findOne({
      where: {
        favoritosId: id,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.repository.delete(id);
    return resultado;
  }
}
