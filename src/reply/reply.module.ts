import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ReplyProviders } from './reply.provider';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...ReplyProviders,
    ReplyService,
  ],
  controllers:[ReplyController],
})
export class ReplyModule {}
