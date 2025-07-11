// Import the initialized TypeORM data source
import AppDataSource from './dataSource';

// Import the Book and Review entities
import { Book } from '../models/Book';
import { Review } from '../models/Review';

// Define the seed function to insert sample data into the database
const seed = async () => {
  // Initialize the database connection
  await AppDataSource.initialize();

  // Get repositories for Book and Review entities
  const bookRepo = AppDataSource.getRepository(Book);
  const reviewRepo = AppDataSource.getRepository(Review);

  // Create a new book instance
  const book1 = bookRepo.create({
    title: 'The Pragmatic Programmer',
    author: 'Andy Hunt & Dave Thomas',
    published_date: '1999-10-20',
  });

  // Save the new book to the database
  await bookRepo.save(book1);

  // Create a review associated with the saved book
  const review1 = reviewRepo.create({
    reviewer: 'Srijan',
    content: 'Must-read for developers!',
    book: book1, // Associate the review with the book
  });

  // Save the review to the database
  await reviewRepo.save(review1);

  // Log that seeding is complete and exit the process
  console.log('Seeded sample data');
  process.exit(0);
};

// Run the seed function
seed();
