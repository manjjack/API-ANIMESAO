import { Comment } from 'src/comments/entities/comment.entity';
import { Column, ManyToOne, PrimaryColumn } from 'typeorm';

export class Reply extends Comment {
  
  @Column()
  idComment: number;

  @ManyToOne(() => Comment, comment => comment.replies)
  comment: Comment;
}
