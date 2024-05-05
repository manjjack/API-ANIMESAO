import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Episode } from 'src/episode/entities/episode.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Animetype } from 'src/animetype/entities/animetype.entity';
import { Slideshow } from 'src/slideshow/entities/slideshow.entity';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn()
  animeId: number;

  @Column({ unique: true })
  titulo: string;

  @Column({ length: 3000 })
  descricao: string;

  @Column({ length: 1500 })
  imagemUrl: string;

  @Column()
  dataLancamento: Date;

  @Column()
  diretor: string;

  @Column()
  estudio: string;

  @Column()
  status: string;

  @Column()
  numeroEpisodios: number;

  @Column()
  audio: string;

  @Column({ nullable: true, default: false })
  filme: boolean;

  @Column({nullable: true, default: false})
  estreia: boolean;

  @ManyToMany(() => Genre, (genre) => genre.genero)
  @JoinTable({ name: 'genero' })
  genero: Genre[];

  @OneToMany(() => Favorite, (favorite) => favorite.anime)
  favorite: Favorite[];

  @OneToMany(() => Episode, (episode) => episode.anime)
  episodes: Episode[];

  @OneToMany(() => Slideshow, (Slideshow) => Slideshow.anime)
  slideShow: Slideshow[];

  @OneToMany(() => Rating, (rating) => rating.anime)
  ratings: Rating[];

  @OneToMany(() => Animetype, (animetype) => animetype.anime)
  animetype: Animetype[];
}
