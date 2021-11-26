const express = require('express');
const { createBook, getBooks, getBookById } = require('../controllers/BookController');

const router = express.Router();

router.post('/books', createBook);
router.get('/books/:id', getBookById);
router.get('/books', getBooks);

module.exports = router;