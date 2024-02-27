import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CommentService } from './comments.service';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Post()
  async create(@Body() commentData: Comment): Promise<Comment> {
    return this.commentService.create(commentData.user, commentData.episode);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatedComment: Partial<Comment>): Promise<Comment> {
    return this.commentService.update(id, updatedComment);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.commentService.delete(id);
  }
}
