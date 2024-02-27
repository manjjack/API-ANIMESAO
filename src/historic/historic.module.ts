import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { HistoricService } from './historic.service';
import { HistoricController } from './historic.controller';
import { historicProviders } from './historic.provider';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...historicProviders,
    HistoricService,
  ],
  controllers:[HistoricController],
})
export class HistoricModule {}
