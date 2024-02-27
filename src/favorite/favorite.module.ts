import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { FavoriteProviders } from './favorite.provider';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...FavoriteProviders,
    FavoriteService,
  ],
  controllers:[FavoriteController],
})
export class FavoriteModule {}
