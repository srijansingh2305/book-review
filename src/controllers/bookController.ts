import { Request, Response } from 'express';
import AppDataSource from '../utils/dataSource';
import { Book } from '../models/Book';
import { Review } from '../models/Review';
import redisClient from '../utils/redisClient';

const bookRepo = AppDataSource.getRepository(Book);
const reviewRepo = AppDataSource.getRepository(Review);

// GET /books - Fetch all books, use Redis cache if available
export const getBooks = async (req: Request, res: Response) => {
  try {
    const cached = await redisClient.get('books_cache');
    if (cached) return res.json(JSON.parse(cached)); // Return cached data

    const books = await bookRepo.find({ relations: ['reviews'] }); // Fetch from DB
    await redisClient.set('books_cache', JSON.stringify(books)); // Cache result
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// POST /books - Add a new book and invalidate cache
export const addBook = async (req: Request, res: Response) => {
  try {
    const book = bookRepo.create(req.body); // Create entity from request
    const result = await bookRepo.save(book); // Save to DB
    await redisClient.del('books_cache'); // Invalidate cache
    res.status(201).json(result);
  } catch (err) {
    console.error('Error in addBook:', err);
    res.status(500).json({ error: 'Failed to add book' });
  }
};

// GET /books/:id/reviews - Fetch reviews for a specific book
export const getReviewsByBookId = async (req: Request, res: Response) => {
  try {
    const book = await bookRepo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['reviews'],
    });

    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book.reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// POST /books/:id/reviews - Add a review for a book and invalidate cache
export const addReview = async (req: Request, res: Response) => {
  try {
    const book = await bookRepo.findOne({ where: { id: parseInt(req.params.id) } });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const review = reviewRepo.create({ ...req.body, book }); // Associate book with review
    const result = await reviewRepo.save(review);
    await redisClient.del('books_cache'); // Invalidate cache
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await reviewRepo.findOne({
      where: { id: parseInt(req.params.id) },
    });

    if (!review) return res.status(404).json({ error: 'Review not found' });

    await reviewRepo.remove(review);
    await redisClient.del('books_cache'); // Invalidate cache
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
