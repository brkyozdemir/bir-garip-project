const User = require('../models/User');
const Book = require('../models/Book');

exports.getUserBooks = async (req, res, next) => {
  try {
    const email = req.user.email;
    const { books } = await User.findOne({ email: email }).populate('books');
    res.json({ books: books });
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
}

exports.addBookById = async (req, res, next) => {
  try {
    const id = req.params.bookId;
    const book = await Book.findById(id);
    const user = await User.findOne({ email: req.user.email });
    user.books.push(book);
    await user.save();
    res.json({
      message: 'Successful'
    });
  } catch (error) {
    next(error);
  }
}

exports.addBookByCreate = async (req, res, next) => {
  try {
    const { name, summary, author, pages } = req.body;
    const email = req.user.email;
    const book = new Book({
      name: name,
      summary: summary,
      author: author,
      pages: pages
    });
    await book.save();
    const user = await User.findOne({ email: email });
    user.books.push(book);
    await user.save();
    res.status(201).json({
      message: 'Successful'
    });
  } catch (error) {
    next(error);
  }
}