import { DataSource } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { Anime } from 'src/anime/entities/anime.entity';

export const EpisodeProviders = [
  {
    provide: 'EPISODE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Episode),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ANIME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Anime),
    inject: ['DATA_SOURCE'],
  },
  
];