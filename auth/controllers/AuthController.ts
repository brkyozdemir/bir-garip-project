import {NextFunction, Request, Response} from "express";
import {IUserRequest} from "../../middlewares/auth";

import {UserModel} from '../../users/models/User';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export const signup = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    bcrypt.hash(password, 12)
      .then((hashedPassword: string) => {
        const user = new UserModel({
          email: email,
          username: username,
          password: hashedPassword
        });
        return user.save();
      })
      .then(() => {
        res.status(201).json({
          message: 'Successfully created.†',
        });
      })
      .catch((err: any) => {
        res.status(400).json(err)
      });
  } catch (error) {
    res.status(400).json(error);
    next(error);
  }
}

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    UserModel.findOne({email: email}).select('password')
      .then((user: any) => {
        if (!user) {
          return res.status(400).json({
            message: 'User does not exists'
          });
        }

        bcrypt.compare(password, user.password)
          .then((matches: any) => {
            if (matches) {
              const token = jwt.sign({email: email}, process.env.JWT_SECRET);
              return res.json({
                token
              });
            }
            return res.status(422).json({
              message: 'Invalid email or password'
            });
          })
          .catch((err: any) => {
            console.log(err);
            next();
          });
      })
      .catch((err: any) => {
        res.status(400).json(err)
        next(err);
      });
  } catch (error) {
    next(error);
  }
}