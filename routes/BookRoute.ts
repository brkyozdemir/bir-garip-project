import { Router } from 'express';
import { BookController } from '../books/controllers/bookController';

const router = Router();

router.post('/books', BookController.createBook);
router.get('/books/:id', BookController.getBookById);
router.get('/books', BookController.getBooks);

export default router;