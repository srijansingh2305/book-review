import { AppDataSource } from './dataSource';
import { Book } from '../models/Book';
import { Review } from '../models/Review';

const seed = async () => {
  await AppDataSource.initialize();

  const bookRepo = AppDataSource.getRepository(Book);
  const reviewRepo = AppDataSource.getRepository(Review);

  const book1 = bookRepo.create({
    title: 'The Pragmatic Programmer',
    author: 'Andy Hunt & Dave Thomas',
    published_date: '1999-10-20',
  });
  await bookRepo.save(book1);

  const review1 = reviewRepo.create({
    reviewer: 'Srijan',
    content: 'Must-read for developers!',
    book: book1
  });
  await reviewRepo.save(review1);

  console.log('✅ Seeded sample data');
  process.exit(0);
};

seed();
