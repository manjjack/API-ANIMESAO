import { Injectable, Inject } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult, Like, Between } from 'typeorm';
import { Anime } from './entities/anime.entity';
import { Animetype } from 'src/animetype/entities/animetype.entity';

@Injectable()
export class AnimeService {
  constructor(
    @Inject('ANIME_REPOSITORY')
    private repository: Repository<Anime>,
    @Inject('ANIMETYPE_REPOSITORY')
    private animetypeRepository: Repository<Animetype>,
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
  
  // retorna os animes mais recentes em 1 ano 
  async findAllAnimesOfYear(ano:number): Promise<Anime[]> {
    const dataInicio = new Date(ano, 0, 1); // Primeiro dia do ano
    const dataFim = new Date(ano, 11, 31, 23, 59, 59); // Último segundo do ano

    return this.repository.find({
      where: {
        dataLancamento: Between(dataInicio, dataFim),
      },
      order: {
        dataLancamento: 'DESC'
      }
    });
  }

  // ordem alfabetica
  async findAnimesByInitialLetter(initialLetter: string): Promise<Anime[]> {
    return await this.repository
      .createQueryBuilder('anime')
      .where('anime.titulo LIKE :initialLetter', {
        initialLetter: `${initialLetter}%`,
      })
      .getMany();
  }

  // Encontra os animes que têm um título que contenha a substring fornecida
  async findByName(name: string): Promise<Anime[]> {
    return this.repository.find({
      where: {
        titulo: Like(`%${name}%`), // Usa Like para pesquisa parcial
      },
    });
  }

  // Encontra os animes com o status especificado
  async findByStatus(status: string): Promise<Anime[]> {
    return this.repository.find({
      where: {
        status: status,
      },
    });
  }

  //Enontra os animes segundo o audio

  async findByAudio(audio: string): Promise<Anime[]> {
    return this.repository.find({
      where: {
        audio: audio,
      },
    });
  }

  // Encontra os animes lançados durante o ano especificado
  async findByYear(ano: number): Promise<Anime[]> {
    const dataInicio = new Date(ano, 0, 1); // Primeiro dia do ano
    const dataFim = new Date(ano, 11, 31, 23, 59, 59); // Último segundo do ano

    return this.repository.find({
      where: {
        dataLancamento: Between(dataInicio, dataFim),
      },
    });
  }

  // Encontra os animes com uma média de classificação igual ao valor especificado
  async findByRating(rating: number): Promise<Anime[]> {
    return this.repository
      .createQueryBuilder('anime')
      .leftJoin('anime.ratings', 'rating')
      .addSelect('AVG(rating.rating)', 'averageRating')
      .groupBy('anime.animeId')
      .having('averageRating = :rating', { rating })
      .getMany();
  }

  // Encontra os animes associados a um gênero específico
  async findByGenero(genero: string): Promise<Anime[]> {
    const animeTypes = await this.animetypeRepository
      .createQueryBuilder('animetype')
      .leftJoin('animetype.genre', 'genre')
      .where('genre.genero = :genero', { genero })
      .getMany();

    const animeIds = animeTypes.map((animeType) => animeType.animeId);

    return this.repository.findByIds(animeIds);
  }

  // -------------------------------------------------------------------------------
  // ------------------- Funcoes de filtros

  // status e ano
  async findByStatusAndYear(status: string, ano: number): Promise<Anime[]> {
    const dataInicio = new Date(ano, 0, 1); // Primeiro dia do ano
    const dataFim = new Date(ano, 11, 31, 23, 59, 59); // Último segundo do ano

    return this.repository
      .createQueryBuilder('anime')
      .where('anime.status = :status', { status })
      .andWhere('anime.dataLancamento BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      })
      .getMany();
  }

  // ano e genero

  async findByYearAndGenre(ano: number, genero: string): Promise<Anime[]> {
    const dataInicio = new Date(ano, 0, 1); // Primeiro dia do ano
    const dataFim = new Date(ano, 11, 31, 23, 59, 59); // Último segundo do ano

    return this.repository
      .createQueryBuilder('anime')
      .leftJoin('anime.animetype', 'animetype')
      .leftJoin('animetype.genre', 'genre')
      .where('genre.genero = :genero', { genero })
      .andWhere('anime.dataLancamento BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      })
      .getMany();
  }

  // genero status

  async findByGenreAndStatus(genero: string, status: string): Promise<Anime[]> {
    return this.repository
      .createQueryBuilder('anime')
      .innerJoin('anime.animetype', 'animetype')
      .innerJoin('animetype.genre', 'genre')
      .where('genre.genero = :genero', { genero })
      .andWhere('anime.status = :status', { status })
      .getMany();
  }

  // audio e year

  async findByAudioAndYear(audio: string, ano: number): Promise<Anime[]> {
    const dataInicio = new Date(ano, 0, 1); // Primeiro dia do ano
    const dataFim = new Date(ano, 11, 31, 23, 59, 59); // Último segundo do ano

    return this.repository
      .createQueryBuilder('anime')
      .where('anime.audio = :audio', { audio })
      .andWhere('anime.dataLancamento BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      })
      .getMany();
  }

  // status ano e genero

  async findByStatusYearAndGenre(
    status: string,
    ano: number,
    genero: string,
  ): Promise<Anime[]> {
    const dataInicio = new Date(ano, 0, 1); // Primeiro dia do ano
    const dataFim = new Date(ano, 11, 31, 23, 59, 59); // Último segundo do ano

    return this.repository
      .createQueryBuilder('anime')
      .leftJoin('anime.animetype', 'animetype')
      .leftJoin('animetype.genre', 'genre')
      .where('anime.status = :status', { status })
      .andWhere('anime.dataLancamento BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      })
      .andWhere('genre.genero = :genero', { genero })
      .getMany();
  }

  // status ano Audio

  async findByStatusYearAndAudio(
    status: string,
    ano: number,
    audio: string,
  ): Promise<Anime[]> {
    const dataInicio = new Date(ano, 0, 1); // Primeiro dia do ano
    const dataFim = new Date(ano, 11, 31, 23, 59, 59); // Último segundo do ano

    return this.repository
      .createQueryBuilder('anime')
      .andWhere('anime.dataLancamento BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      })
      .andWhere('anime.status = :status', { status })
      .andWhere('anime.audio = :audio', { audio })
      .getMany();
  }

  // ano genero audio

  async findByYearGenreAndAudio(
    ano: number,
    genero: string,
    audio: string,
  ): Promise<Anime[]> {
    const dataInicio = new Date(ano, 0, 1); // Primeiro dia do ano
    const dataFim = new Date(ano, 11, 31, 23, 59, 59); // Último segundo do ano

    return this.repository
      .createQueryBuilder('anime')
      .leftJoin('anime.animetype', 'animetype')
      .leftJoin('animetype.genre', 'genre')
      .andWhere('anime.dataLancamento BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      })
      .andWhere('genre.genero = :genero', { genero })
      .andWhere('anime.audio = :audio', { audio })
      .getMany();
  }

  // status ano audio genero

  async findByStatusYearGenreAndAudio(
    status: string,
    ano: number,
    genero: string,
    audio: string,
  ): Promise<Anime[]> {
    const dataInicio = new Date(ano, 0, 1); // Primeiro dia do ano
    const dataFim = new Date(ano, 11, 31, 23, 59, 59); // Último segundo do ano

    return this.repository
      .createQueryBuilder('anime')
      .leftJoinAndSelect('anime.genero', 'genre')
      .leftJoinAndSelect('anime.animetype', 'animetype')
      .where('anime.status = :status', { status })
      .andWhere('anime.dataLancamento BETWEEN :dataInicio AND :dataFim', {
        dataInicio,
        dataFim,
      })
      .andWhere('genre.genero = :genero', { genero })
      .andWhere('anime.audio = :audio', { audio })
      .getMany();
  }

  // status audio

  async findByStatusAndAudio(status: string, audio: string): Promise<Anime[]> {
    return this.repository
      .createQueryBuilder('anime')
      .where('anime.status = :status', { status })
      .andWhere('anime.audio = :audio', { audio })
      .getMany();
  }
  // genero audio
  async findByGenreAndAudio(genero: string, audio: string): Promise<Anime[]> {
    return this.repository
      .createQueryBuilder('anime')
      .leftJoin('anime.genero', 'genre')
      .leftJoin('anime.animetype', 'animetype')
      .leftJoin('anime.audio', 'audio')
      .where('genre.genero = :genero', { genero })
      .andWhere('anime.audio = :audio', { audio })
      .getMany();
  }

  // status genero audio

  async findByStatusGenreAndAudio(
    status: string,
    genero: string,
    audio: string,
  ): Promise<Anime[]> {
    return this.repository
      .createQueryBuilder('anime')
      .leftJoin('anime.genero', 'genre')
      .leftJoin('anime.animetype', 'animetype')
      .leftJoin('animetype.audio', 'audio')
      .where('anime.status = :status', { status })
      .andWhere('genre.genero = :genero', { genero })
      .andWhere('anime.audio = :audio', { audio })
      .getMany();
  }

  //-------------------------------------------------------------------------
  //----------------------------Fim Funcoes de Filtro

  // -------------- Funcao Principal

  async filterAnimes(
    status?: string,
    genero?: string,
    audio?: string,
    ano?: number,
  ): Promise<Anime[]> {
    if (status === 'null' || status === undefined) {
      status = null;
    }
    if (genero === 'null' || genero === undefined) {
      genero = null;
    }
    if (audio === 'null' || audio === undefined) {
      audio = null;
    }
    if (typeof ano === 'string' && ano === 'null') {
      ano = null;
    }

    let query = this.repository.createQueryBuilder('anime');

    if (status && ano && !audio && !genero) {
      return this.findByStatusAndYear(status, ano);
    } else if (status && ano && !audio && genero) {
      return this.findByStatusYearAndGenre(status, ano, genero);
    } else if (status && ano && audio && !genero) {
      return this.findByStatusYearAndAudio(status, ano, audio);
    } else if (status && ano && audio && genero) {
      return this.findByStatusYearGenreAndAudio(status, ano, genero, audio);
    } else if (status && !ano && !audio && !genero) {
      return this.findByStatus(status);
    } else if (status && !ano && !audio && genero) {
      return this.findByGenreAndStatus(genero, status);
    } else if (status && !ano && audio && !genero) {
      return this.findByStatusAndAudio(status, audio);
    } else if (status && !ano && audio && genero) {
      return this.findByStatusGenreAndAudio(status, genero, audio);
    } else if (!status && ano && !audio && !genero) {
      return this.findByYear(ano);
    } else if (!status && ano && !audio && genero) {
      return this.findByYearAndGenre(ano, genero);
    } else if (!status && ano && audio && !genero) {
      return this.findByAudioAndYear(audio, ano);
    } else if (!status && ano && audio && genero) {
      return this.findByYearGenreAndAudio(ano, genero, audio);
    } else if (!status && !ano && audio && !genero) {
      return this.findByAudio(audio);
    } else if (!status && !ano && audio && genero) {
      return this.findByGenreAndAudio(genero, audio);
    } else if (!status && !ano && !audio && genero) {
      return this.findByGenero(genero);
    }

    return query.getMany();
  }

  async filterAnimes2(
    status?: string,
    genero?: string,
    audio?: string,
    ano?: number,
  ): Promise<Anime[]> {
    // Objeto para armazenar os filtros ativos
    const filtros: { [chave: string]: string | number | null } = {
      status: status ?? null,
      //genero: genero ?? null,
      audio: audio ?? null,
      //ano: ano ?? null,
    };

    // Construtor da consulta
    let consulta = this.repository.createQueryBuilder('anime');
    let clausulaWhere = '';

    // Filtros ativos (com valores não nulos)
    const filtrosAtivos = Object.entries(filtros).filter(
      ([chave, valor]) => valor !== null,
    );

    // Construção dinâmica da cláusula WHERE
    if (filtrosAtivos.length > 0) {
      clausulaWhere = filtrosAtivos
        .map(([chave, valor]) => `${chave} = :${chave}`)
        .join(' AND ');
      consulta = consulta.where(clausulaWhere, filtros);
    }

    // Retorna os animes filtrados
    return consulta.getMany();
  }
}
