const Book = require('../models/Book');

const BookController = {
  getBooks: async (req, res, next) => {
    try {
      const books = await Book.find();
      res.json({ books });
    } catch (error) {
      res.status(400).json(error);
      next(error);
    }
  },
  getBookById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const book = await Book.findById(id);
      res.json({ book });
    } catch (error) {
      res.status(400).json(error);
      next(error);
    }
  },
  createBook: async (req, res, next) => {
    try {
      const { name, summary, author, pages } = req.body;
      const book = new Book({
        name: name,
        summary: summary,
        author: author,
        pages: pages
      });
      await book.save();
      res.status(201).json({
        book
      });
    } catch (error) {
      res.status(400).json(error);
      next(error);
    }
  }
}

module.exports = BookController;