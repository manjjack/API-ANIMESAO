import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private repository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.repository.find();
  }

  async create(
    comment: Comment,
    idUser: number,
    idEpisode: number,
  ): Promise<Comment> {
    comment.user = idUser;
    comment.episode = idEpisode;
    return this.repository.save(comment);
  }

  async update(id: number, updatedComment: Partial<Comment>): Promise<Comment> {
    const updateResult: UpdateResult = await this.repository.update(
      id,
      updatedComment,
    );

    if (updateResult.affected === 0) {
      throw new Error('Usuário não encontrado ou a atualização falhou');
    }
    const comment: Comment = await this.repository.findOne({
      where: {
        commentId: id,
      },
    });
    return comment;
  }

  async findOne(id: number): Promise<Comment> {
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
