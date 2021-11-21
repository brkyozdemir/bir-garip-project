const express = require('express');
const {
  getUserBooks,
  addBookById,
  addBookByCreate
} = require('../controllers/UserController');

const router = express.Router();

router.get('/users/books/list', getUserBooks);
router.post('/users/books/:bookId', addBookById);
router.post('/users/books', addBookByCreate);

module.exports = router;