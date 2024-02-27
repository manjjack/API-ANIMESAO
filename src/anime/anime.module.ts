import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { DatabaseModule } from 'src/database/database.module';
import { AnimeProviders } from './anime.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...AnimeProviders, AnimeService],
  controllers: [AnimeController],
})
export class AnimeModule {}
