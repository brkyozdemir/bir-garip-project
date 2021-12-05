import {NextFunction, Request, Response} from "express";

const User = require('../../users/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    User.findOne({email: email})
      .then((user: any) => {
        if (user) {
          return res.status(400).json({
            message: 'User exists'
          });
        }
      });

    return bcrypt.hash(password, 12)
      .then((hashedPassword: any) => {
        const user = new User({
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
    next(error);
  }
}

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}).select('password')
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