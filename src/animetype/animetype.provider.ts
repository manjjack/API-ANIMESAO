import { DataSource } from 'typeorm';
import { Animetype } from './entities/animetype.entity';
import { Anime } from 'src/anime/entities/anime.entity';
export const AnimeTypeProviders = [
  {
    provide: 'ANIMETYPE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Animetype),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ANIME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Anime),
    inject: ['DATA_SOURCE'],
  },
  
];