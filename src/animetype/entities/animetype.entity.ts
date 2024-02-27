import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Anime } from 'src/anime/entities/anime.entity';
import { Genre } from 'src/genre/entities/genre.entity';
@Entity()
export class Animetype {
  @PrimaryGeneratedColumn()
  animeTypeId: number;

  @Column()
  animeId: number;
  @ManyToOne(() => Anime, (anime) => anime.genero)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @Column()
  generoId: number;
  
  @ManyToOne(() => Genre, (genre) => genre.genero)
  @JoinColumn({ name: 'generoId' })
  genre: Genre;
}
