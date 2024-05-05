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

  @Column()
  numeroEpisodio: number;

  @Column()
  tituloEpisodio: string;

  @Column({length: 2000})
  sinopseEpisodio: string;

  @Column({unique: true, length: 2000})
  urlVideo: string;

  @Column({ nullable: true, default: 'none'})
  servidorHospedagem: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dataVisualizacao: Date;

  @Column()
  numeroDaTemporada: number;

  @Column()
  dataLancamento: Date;

  @OneToMany(() => Historic, (historic) => historic.episode)
  historics: Historic[];

  @OneToMany(() => Comment, (comment) => comment.episode)
  comments: Comment[];


  
}
