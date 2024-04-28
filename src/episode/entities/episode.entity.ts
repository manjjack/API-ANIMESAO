import { Historic } from 'src/historic/entities/historic.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Anime } from 'src/anime/entities/anime.entity';
import { Comment } from 'src/comments/entities/comment.entity';
@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  episodioId: number;

  @Column()
  animeId: number;

  @ManyToOne(() => Anime, (anime) => anime.episodes)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @Column({unique: true})
  numeroEpisodio: number;

  @Column()
  tituloEpisodio: string;

  @Column()
  sinopseEpisodio: string;

  @Column({unique: true})
  urlVideo: string;

  @Column({ nullable: true })
  servidorHospedagem: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dataVisualizacao: Date;

  @Column()
  numeroDaTemporada: number;

  @OneToMany(() => Historic, (historic) => historic.episode)
  historics: Historic[];

  @OneToMany(() => Comment, (comment) => comment.episode)
  comments: Comment[];
}
