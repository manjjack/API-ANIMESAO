import { Anime } from 'src/anime/entities/anime.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  generoId: number;

  @Column()
  genero: string;

  @ManyToMany(() => Anime, anime => anime.genero)
  animes: Anime[];
}
