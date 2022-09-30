import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment', { name: 'userid' })
  userId: number;

  @Column({ name: 'firstname' })
  firstName: string;

  @Column({ name: 'lastname' })
  lastName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  age: number;
}
