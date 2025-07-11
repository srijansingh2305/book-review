import request from 'supertest';
import express from 'express';
import  AppDataSource  from '../src/utils/dataSource';
import bookRoutes from '../src/routes/bookRoutes';
import  redisClient  from '../src/utils/redisClient';

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

beforeAll(async () => {
  await AppDataSource.initialize();
  if (!redisClient.isOpen) await redisClient.connect();
});

afterAll(async () => {
  if (redisClient.isOpen) await redisClient.quit();
  await AppDataSource.destroy();
});

describe('Book API Tests', () => {
  it('should add a new book', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        title: 'Test Book',
        author: 'Tester',
        published_date: '2025-01-01',
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Book');
  });

  it('should fetch all books (cache miss)', async () => {
    await redisClient.del('books_cache'); // simulate cache miss

    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
