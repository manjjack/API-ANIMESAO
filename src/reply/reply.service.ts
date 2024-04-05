import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Reply } from './entities/reply.entity';

@Injectable()
export class ReplyService {
  constructor(
    @Inject('REPLY_REPOSITORY')
    private repository: Repository<Reply>,
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>
  ) {}

  async findAll(): Promise<Reply[]> {
    return this.repository.find();
  }

  async create(idComment: number): Promise<Reply> {
    const reply = new Reply();
    reply.idComment = idComment;
    return this.repository.save(reply);
  }

  async update(id: number, updatedReply: Partial<Reply>): Promise<Reply> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedReply,
    );

    if (updateResult.affected === 0) {
      throw new Error('Usuário não encontrado ou a atualização falhou');
    }
    const reply: Reply = await this.repository.findOne({
      where: {
        commentId: id,
      },
    });
    return reply;
  }

  async findOne(id: number): Promise<Reply> {
    return await this.repository.findOne({
      where: {
        commentId: id,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    const resultado: DeleteResult = await this.repository.delete(id);
    return resultado;
  }
}
