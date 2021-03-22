const express = require('express');
const {
  getUserBooks,
  addBookById,
  addBookByCreate
} = require('../controllers/UserController');

const router = express.Router();

router.get('/user/book/list', getUserBooks);
router.post('/user/book/:bookId', addBookById);
router.post('/user/book', addBookByCreate);

module.exports = router;