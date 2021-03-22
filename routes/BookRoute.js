const express = require('express');
const { createBook, getBooks, getBookById } = require('../controllers/BookController');

const router = express.Router();

router.post('/book', createBook);
router.get('/book', getBookById);
router.get('/book/list', getBooks);

module.exports = router;