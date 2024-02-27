import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CommentService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentProviders } from './comment.provider';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...CommentProviders,
    CommentService,
  ],
  controllers:[CommentsController],
})
export class CommentsModule {}
