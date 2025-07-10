import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from './Review';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column()
  published_date!: string;

  @OneToMany(() => Review, (review) => review.book)
  reviews!: Review[];  // ✅ Use definite assignment
}
