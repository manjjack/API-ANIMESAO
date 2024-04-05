import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { Reply } from './entities/reply.entity';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post(':idComment')
  async create(@Param('idComment') idComment: number): Promise<any> {
    try {
      const reply = await this.replyService.create(idComment);
      return { success: true, reply };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get()
  findAll() {
    return this.replyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.replyService.findOne(+id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updatedReply: Partial<Reply>,
  ): Promise<Reply> {
    try {
      const reply: Reply = await this.replyService.update(id, updatedReply);
      return reply;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.replyService.delete(+id);
  }
}
