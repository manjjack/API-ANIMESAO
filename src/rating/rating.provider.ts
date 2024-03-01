import { DataSource } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { Anime } from 'src/anime/entities/anime.entity';

export const RatingProviders = [
  {
    provide: 'RATING_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rating),
    inject: ['DATA_SOURCE'],
  }, 
  
  {
    provide: 'ANIME_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Anime),
    inject: ['DATA_SOURCE'],
  },
  
];