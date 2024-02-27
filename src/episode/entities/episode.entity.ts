import { Historic } from 'src/historic/entities/historic.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Anime } from 'src/anime/entities/anime.entity';
@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  episodioId: number;

  @Column()
  animeId: number;

  @ManyToOne(() => Anime, anime => anime.episodes) // Define a relação com Anime
  @JoinColumn({ name: 'animeId' }) // Especifica o nome da coluna na tabela Episode que armazena a chave estrangeira
  anime: Anime;

  @Column()
  numeroEpisodio: number;

  @Column()
  tituloEpisodio: string;

  @Column()
  sinopseEpisodio: string;

  @Column()
  urlVideo: string;

  @Column()
  servidorHospedagem: string;

  @OneToMany(() => Historic, historic => historic.episode)
  historics: Historic[];
}
