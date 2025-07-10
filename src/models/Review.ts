import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  reviewer!: string;

  @Column()
  content!: string;

  @ManyToOne(() => Book, book => book.reviews, { onDelete: 'CASCADE' })
  book!: Book;
}