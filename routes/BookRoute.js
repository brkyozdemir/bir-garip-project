const express = require('express');
const { createBook, getBooks, getBookById } = require('../books/controllers/bookController');

const router = express.Router();

router.post('/books', createBook);
router.get('/books/:id', getBookById);
router.get('/books', getBooks);

module.exports = router;