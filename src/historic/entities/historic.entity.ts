import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Episode } from 'src/episode/entities/episode.entity';

@Entity()
export class Historic {
  @PrimaryGeneratedColumn()
  historicoId: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  episodeId: number;

  @ManyToOne(() => Episode)
  @JoinColumn({ name: 'episodioId' })
  episode: Episode;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dataVisualizacao: Date;
}
