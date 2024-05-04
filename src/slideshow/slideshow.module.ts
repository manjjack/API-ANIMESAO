import { Module } from '@nestjs/common';
import { SlideshowService } from './slideshow.service';
import { SlideshowController } from './slideshow.controller';
import { DatabaseModule } from 'src/database/database.module';
import { SlideShowProviders } from './slideshow.provider';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...SlideShowProviders,
    SlideshowService,
  ],
  controllers:[SlideshowController],
})
export class SlideshowModule {}
