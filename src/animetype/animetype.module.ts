import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AnimeTypeService } from './animetype.service';
import { AnimetypeController } from './animetype.controller';
import { AnimeTypeProviders } from './animetype.provider';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...AnimeTypeProviders,
    AnimeTypeService,
  ],
  controllers:[AnimetypeController],
})

export class AnimetypeModule {}
