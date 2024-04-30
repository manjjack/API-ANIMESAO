import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ReportProviders } from './report.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...ReportProviders,
    ReportService,
  ],
  controllers:[ReportController],
})
export class ReportModule {}
