import { DataSource } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

export const FavoriteProviders = [
  {
    provide: 'FAVORITE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Favorite),
    inject: ['DATA_SOURCE'],
  },
  
];