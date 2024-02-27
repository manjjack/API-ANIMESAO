import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { DatabaseModule } from 'src/database/database.module';
import { GenreProviders } from './genre.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...GenreProviders, GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
