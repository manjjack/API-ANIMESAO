import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column, 
} from 'typeorm';
import { Anime } from 'src/anime/entities/anime.entity';
import { User } from 'src/user/entities/user.entity';
import { IsInt, Min, Max } from 'class-validator';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt({ message: 'O rating deve ser um número inteiro.' })
  @Min(0, { message: 'O rating não pode ser menor que 0.' })
  @Max(5, { message: 'O rating não pode ser maior que 5.' })
  rating: number;

  @Column()
  animeId: number;

  @Column()
  userId:number;

  @ManyToOne(() => Anime, (anime) => anime.ratings)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn({ name: 'userId' })
  user: User;
}
