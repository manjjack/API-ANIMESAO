import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { EpisodeProviders } from './episode.provider';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...EpisodeProviders,
    EpisodeService,
  ],
  controllers:[EpisodeController],
})
export class EpisodeModule {}
