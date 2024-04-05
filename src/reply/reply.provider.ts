import { DataSource } from 'typeorm';
import { Reply } from './entities/reply.entity';

export const ReplyProviders = [
  {
    provide: 'REPLAY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Reply),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'COMMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comment),
    inject: ['DATA_SOURCE'],
  },
  
];