import { DataSource } from 'typeorm';
import { Episode } from './entities/episode.entity';

export const EpisodeProviders = [
  {
    provide: 'EPISODE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Episode),
    inject: ['DATA_SOURCE'],
  },
  
];