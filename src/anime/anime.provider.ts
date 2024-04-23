import { DataSource } from 'typeorm';
import { Anime } from './entities/anime.entity';
import { Animetype } from 'src/animetype/entities/animetype.entity';

export const AnimeProviders = [
  {
    provide: 'ANIME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Anime),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ANIMETYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Animetype),
    inject: ['DATA_SOURCE'],
  },
];