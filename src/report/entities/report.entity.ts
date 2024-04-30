import { Anime } from 'src/anime/entities/anime.entity';
import { Episode } from 'src/episode/entities/episode.entity';
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm';

@Entity()
export class Report {
  @PrimaryColumn()
  idReport: number;

  @Column({ nullable: true })
  animeId: number;

  @ManyToOne(() => Anime, (anime) => anime.episodes)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @Column({ nullable: true })
  episodioId: number;

  @ManyToOne(() => Episode, (episode) => episode.anime)
  @JoinColumn({ name: 'episodioId' })
  Episode: Episode;

  @Column({ length: 4000 })
  message: string;

  @Column({ default: true })
  status: boolean;
}
