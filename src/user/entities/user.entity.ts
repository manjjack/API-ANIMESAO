import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Historic } from 'src/historic/entities/historic.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { Rating } from 'src/rating/entities/rating.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({unique: true})
  username: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dataCadastro: Date;

  @Column({nullable:true})
  imgUrl: string;
  
  @Column({nullable:true})
  capa: string;

  @Column({default: false})
  status: boolean;
  
  @OneToMany(() => Historic, historic => historic.user)
  historics: Historic[];
  
  @OneToMany(() => Favorite, favorite => favorite.user)
  favorite: Favorite[];
  
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[];
}
