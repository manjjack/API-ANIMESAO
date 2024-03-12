
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Episode } from 'src/episode/entities/episode.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  content: string;

  @Column()
  dateTime: Date;

  @ManyToOne(() => User, user => user.comments)
  user: number;

  @ManyToOne(() => Episode, episode => episode.comments)
  episode: number;
}