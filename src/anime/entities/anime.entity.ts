import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Episode } from 'src/episode/entities/episode.entity';
@Entity()
export class Anime {
  @PrimaryGeneratedColumn()
  animeId: number;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  imagemUrl: string;

  @Column()
  classificacao: number;

  @Column()
  dataLancamento: Date;

  @Column()
  diretor: string;

  @Column()
  estudio: string;

  @Column()
  numeroEpisodios: number;
  
  @ManyToMany(() => Genre, genre => genre.genero)
  @JoinTable({ name: 'genero' })
  genero: Genre[];

  @OneToMany(() => Favorite, favorite => favorite.anime)
  favorite: Favorite[];

  @OneToMany(() => Episode, episode => episode.anime)
  episodes: Episode[];

}
