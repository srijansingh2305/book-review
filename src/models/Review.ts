import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Book } from './Book';

@Entity() // Declares this class as a table named "review"
export class Review {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id!: number;

  @Column() // Reviewer's name
  reviewer!: string;

  @Column() // Review content
  content!: string;

  @Index('idx_review_bookId') // Adds index on the foreign key column to optimize queries
  @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE' }) // Many reviews can belong to one book; delete reviews if book is deleted
  book!: Book;
}
