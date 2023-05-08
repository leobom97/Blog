/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', unique: true })
  password: string;
}
