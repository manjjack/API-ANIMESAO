import { DataSource } from 'typeorm';
import { Historic } from './entities/historic.entity';

export const historicProviders = [
  {
    provide: 'HISTORIC_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Historic),
    inject: ['DATA_SOURCE'],
  },
  
];