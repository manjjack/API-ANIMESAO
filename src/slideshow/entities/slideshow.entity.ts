import { Anime } from 'src/anime/entities/anime.entity';
import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Slideshow {
  @PrimaryColumn()
  slideId: number;

  @Column()
  animeId: number;

  @Column()
  imgCapa: string;

  @Column({ nullable: true })
  dataEstreia: Date;

  @ManyToOne(() => Anime, (anime) => anime.episodes)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;
}
