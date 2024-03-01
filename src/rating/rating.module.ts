import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { RatingProviders } from './rating.provider';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...RatingProviders,
    RatingService,
  ],
  controllers:[RatingController],
})
export class RatingModule {}
