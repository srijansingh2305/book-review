// src/utils/dataSource.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Book } from '../models/Book';
import { Review } from '../models/Review';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true, // Set false in production and use migrations
  logging: false,
  entities: [Book, Review],
});
