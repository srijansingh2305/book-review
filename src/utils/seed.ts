import AppDataSource from './dataSource';
import { Book } from '../models/Book';
import { Review } from '../models/Review';
import redisClient from './redisClient'; // Add this

// Seed function to populate the database and clear Redis cache
const seed = async () => {
  // Initialize the database connection
  await AppDataSource.initialize();

  // Get repositories for Book and Review entities
  const bookRepo = AppDataSource.getRepository(Book);
  const reviewRepo = AppDataSource.getRepository(Review);

  // Sample book data
  const books = [
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      published_date: '2008-08-01',
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt & David Thomas',
      published_date: '1999-10-20',
    },
    {
      title: 'Design Patterns',
      author: 'Erich Gamma et al.',
      published_date: '1994-10-21',
    },
    {
      title: 'You Don’t Know JS',
      author: 'Kyle Simpson',
      published_date: '2015-12-27',
    },
  ];

  // Sample review content
  const reviews = [
    'A must-read for every developer.',
    'Great patterns, still relevant today.',
    'Concepts are timeless and well explained.',
    'Helped me write better JavaScript!',
  ];

  // Loop through each book and create corresponding review
  for (let i = 0; i < books.length; i++) {
    // Create and save book entity
    const book = bookRepo.create(books[i]);
    await bookRepo.save(book);

    // Create and save review entity linked to the book
    const review = reviewRepo.create({
      reviewer: ['Alice', 'Bob', 'Charlie', 'Diana'][i],
      content: reviews[i],
      book,
    });
    await reviewRepo.save(review);
  }

  // Connect to Redis if not already connected
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  // Delete the books cache key from Redis
  await redisClient.del('books_cache');

  // Log completion message and exit process
  console.log('Seeded sample data and cleared Redis cache');
  process.exit(0);
};

// Run the seed function
seed();
