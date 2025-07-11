import { DataSourceOptions } from 'typeorm';
import { Book } from './src/models/Book';
import { Review } from './src/models/Review';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: false,
  entities: [Book, Review],
  migrations: ['src/migrations/*.ts'],
};

export default config;
