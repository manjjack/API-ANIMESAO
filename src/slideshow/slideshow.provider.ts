import { DataSource } from 'typeorm';
import { Slideshow } from './entities/slideshow.entity';


export const SlideShowProviders = [
  {
    provide: 'SLIDESHOW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Slideshow),
    inject: ['DATA_SOURCE'],
  },
  
];