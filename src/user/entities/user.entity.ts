import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Historic } from 'src/historic/entities/historic.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  dataCadastro: Date;

  @Column()
  imgUrl: string;
  
  @OneToMany(() => Historic, historic => historic.user)
  historics: Historic[];
  
  @OneToMany(() => Favorite, favorite => favorite.user)
  favorite: Favorite[];
  
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

}
