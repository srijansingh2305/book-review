import { Request, Response } from 'express';
import { AppDataSource } from '../utils/dataSource';
import { Book } from '../models/Book';
import { Review } from '../models/Review';
import  redisClient  from '../utils/redisClient';

const bookRepo = AppDataSource.getRepository(Book);
const reviewRepo = AppDataSource.getRepository(Review);

export const getBooks = async (req: Request, res: Response) => {
  try {
    const cached = await redisClient.get('books_cache');
    if (cached) return res.json(JSON.parse(cached));

    const books = await bookRepo.find({ relations: ['reviews'] });
    await redisClient.set('books_cache', JSON.stringify(books));
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const book = bookRepo.create(req.body);
    const result = await bookRepo.save(book);
    await redisClient.del('books_cache');
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book' });
  }
};

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

export const addReview = async (req: Request, res: Response) => {
  try {
    const book = await bookRepo.findOne({ where: { id: parseInt(req.params.id) } });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const review = reviewRepo.create({ ...req.body, book });
    const result = await reviewRepo.save(review);
    await redisClient.del('books_cache');
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};
