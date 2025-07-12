import AppDataSource from './dataSource';
import { Book } from '../models/Book';
import { Review } from '../models/Review';

const clear = async () => {
  await AppDataSource.initialize();

  const reviewRepo = AppDataSource.getRepository(Review);
  const bookRepo = AppDataSource.getRepository(Book);

  // First clear reviews (child table)
  await reviewRepo.clear();

  // Then clear books (parent table)
  await bookRepo.clear();

  console.log('All books and reviews deleted.');
  process.exit(0);
};

clear();
