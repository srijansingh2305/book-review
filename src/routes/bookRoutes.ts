// src/routes/bookRoutes.ts
import { Router } from 'express';
import {
  getBooks,
  addBook,
  getReviewsByBookId,
  addReview,
  deleteReview 
} from '../controllers/bookController';

const router = Router();

router.get('/', getBooks);                       // GET /books
router.post('/', addBook);                       // POST /books
router.get('/:id/reviews', getReviewsByBookId);  // GET /books/:id/reviews
router.post('/:id/reviews', addReview);          // POST /books/:id/reviews
router.delete('/:id/reviews', deleteReview);


export default router;
