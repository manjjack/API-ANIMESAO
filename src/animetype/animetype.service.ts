import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Animetype } from './entities/animetype.entity';
import { Anime } from 'src/anime/entities/anime.entity';

@Injectable()
export class AnimeTypeService {
  constructor(
    @Inject('ANIMETYPE_REPOSITORY')
    private repository: Repository<Animetype>,
    @Inject('ANIME_REPOSITORY')
    private animeRepository: Repository<Anime>,
  ) {}

  

  async findAll(): Promise<Animetype[]> {
    return this.repository.find();
  }

  async create(animetype: Animetype, idAnime: number, idGenre: number): Promise<Animetype> {
    // Cria uma nova instância de Animestype com os IDs do anime e do genero
    animetype.animeId = idAnime;
    animetype.generoId = idGenre;

    // Salva o objeto AnimeType no banco de dados
    return this.repository.save(animetype);
  }

  async update(
    id: number,
    updatedAnimetype: Partial<Animetype>,
  ): Promise<Animetype> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedAnimetype,
    );

    if (updateResult.affected === 0) {
      throw new Error('Usuário não encontrado ou a atualização falhou');
    }
    const animetype: Animetype = await this.repository.findOne({
      where: {
        animeTypeId: id,
      },
    });
    return animetype;
  }

  async findOne(id: number): Promise<Animetype> {
    return await this.repository.findOne({
      where: {
        animeTypeId: id,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.repository.delete(id);
    return resultado;
  }

  async findByGenre(genreId: number): Promise<Anime[]> {
    // Consulta para encontrar todos os registros de Animetype com o gênero desejado
    const animetypes = await this.repository.find({
      where: {
        generoId: genreId,
      },
    });

    // Extrai os IDs dos animes associados ao gênero
    const animeIds = animetypes.map((animetype) => animetype.animeId);

    // Consulta para encontrar todos os animes com os IDs obtidos
    const animes = await this.animeRepository.findByIds(animeIds);

    return animes;
  }
}
