import { DataSource } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { User } from 'src/user/entities/user.entity';

export const adminProviders = [
  {
    provide: 'ADMIN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Admin),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];