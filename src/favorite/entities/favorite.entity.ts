import { Anime } from 'src/anime/entities/anime.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  favoritosId: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  animeId: number;

  @ManyToOne(() => Anime)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;
}
