import {NextFunction, Request, Response} from "express";
import {UserModel} from "../models/User";
import {IUserRequest} from "../../middlewares/auth";

const Book = require('../../books/models/book');

exports.getUserBooks = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const email = req.user.email;
    const user: any = await UserModel.findOne({email: email}).populate('books');
    res.json({books: user.books});
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
}

exports.addBookById = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.bookId;
    const authUser = req.user;
    const book = await Book.findById(id);
    const user: any = await UserModel.findOne({email: authUser.email});
    user.books.push(book);
    await user.save();
    res.json({
      message: 'Successful'
    });
  } catch (error) {
    next(error);
  }
}

exports.addBookByCreate = async (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const {name, summary, author, pages} = req.body;
    const email = req.user.email;
    const book = new Book({
      name: name,
      summary: summary,
      author: author,
      pages: pages
    });
    await book.save();
    const user = await UserModel.findOne({email: email});
    user!.books.push(book);
    await user!.save();
    res.status(201).json({
      message: 'Successful'
    });
  } catch (error) {
    next(error);
  }
}