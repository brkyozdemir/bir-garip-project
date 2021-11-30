const express = require('express');
const {
  getUserBooks,
  addBookById,
  addBookByCreate
} = require('../users/controllers/UserController');

const router = express.Router();

router.get('/users/books', getUserBooks);
router.post('/users/books/:bookId', addBookById);
router.post('/users/books', addBookByCreate);

module.exports = router;