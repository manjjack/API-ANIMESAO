import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as cors from 'cors';
import { UserModule } from './user/user.module';
import { AnimeModule } from './anime/anime.module';
import { EpisodeModule } from './episode/episode.module';
import { FavoriteModule } from './favorite/favorite.module';
import { HistoricModule } from './historic/historic.module';
import { AnimetypeModule } from './animetype/animetype.module';
import { GenreModule } from './genre/genre.module';
import { CommentsModule } from './comments/comments.module';
import { RatingModule } from './rating/rating.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    UserModule,
    AnimeModule,
    EpisodeModule,
    FavoriteModule,
    HistoricModule,
    AnimetypeModule,
    GenreModule,
    JwtModule.register({
      secret: 'AAO',
      // signOptions: { expiresIn: '1h' }, // Configuração opcional para definir o tempo de expiração do token
    }),
    CommentsModule,
    RatingModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
