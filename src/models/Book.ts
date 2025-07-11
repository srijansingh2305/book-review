// src/models/Book.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Review } from './Review';

@Entity() // Marks this class as a database table
export class Book {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id!: number;

  @Column() // Title of the book
  title!: string;

  @Column() // Author of the book
  author!: string;

  @Column() // Published date in YYYY-MM-DD format
  published_date!: string;

  @OneToMany(() => Review, (review) => review.book) // One book has many reviews
  reviews!: Review[];
}
