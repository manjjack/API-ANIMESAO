import { DataSource } from 'typeorm';
import { ReportError } from './entities/report.entity';

export const ReportProviders = [
  {
    provide: 'REPORT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ReportError),
    inject: ['DATA_SOURCE'],
  }
  
];