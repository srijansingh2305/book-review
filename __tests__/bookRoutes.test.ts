import request from 'supertest'; // For HTTP assertions
import express from 'express'; // Express app
import AppDataSource from '../src/utils/dataSource'; // TypeORM data source
import bookRoutes from '../src/routes/bookRoutes'; // Book routes
import redisClient from '../src/utils/redisClient'; // Redis client
import { Book } from '../src/models/Book'; // Book entity
import { Review } from '../src/models/Review'; // Review entity

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use('/books', bookRoutes); // Mount book routes

// Runs before all tests
beforeAll(async () => {
  await AppDataSource.initialize(); // Initialize DB connection
  if (!redisClient.isOpen) await redisClient.connect(); // Connect to Redis if not open

  // Clear test data before tests run (fresh state)
  const reviewRepo = AppDataSource.getRepository(Review);
  const bookRepo = AppDataSource.getRepository(Book);
  await reviewRepo.clear(); // Remove all reviews
  await bookRepo.clear(); // Remove all books
  await redisClient.del('books_cache'); // Clear books cache
});

// Runs after all tests
afterAll(async () => {
  // Also clear after tests to avoid lingering data
  const reviewRepo = AppDataSource.getRepository(Review);
  const bookRepo = AppDataSource.getRepository(Book);
  await reviewRepo.clear(); // Remove all reviews
  await bookRepo.clear(); // Remove all books

  if (redisClient.isOpen) await redisClient.quit(); // Disconnect Redis
  await AppDataSource.destroy(); // Close DB connection
});

describe('Book API Tests', () => {
  // Test for adding a new book
  it('should add a new book', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        title: 'Test Book',
        author: 'Tester',
        published_date: '2025-01-01',
      });

    expect(response.status).toBe(201); // Should return 201 Created
    expect(response.body.title).toBe('Test Book'); // Title should match
  });

  // Test for fetching all books (cache miss)
  it('should fetch all books (cache miss)', async () => {
    await redisClient.del('books_cache'); // Simulate cache miss

    const response = await request(app).get('/books');
    expect(response.status).toBe(200); // Should return 200 OK
    expect(Array.isArray(response.body)).toBe(true); // Response should be an array
  });
});
