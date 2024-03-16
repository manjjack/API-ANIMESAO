import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryColumn()
  adminId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;
}
