import {NextFunction, Request, Response} from "express";
import {IUserRequest} from "../../middlewares/auth";

import {UserModel} from '../../users/models/User';

type SignupType = {
  email: string
  password: string
  username: string
}

function checkPassword(password: string, res: Response) {
  if (password === null || password === undefined) {
    return res.status(400).json({
      _message: 'Password is required'
    });
  }
}

export function handle(req: Request, res: Response, next: NextFunction): void {
  const body = req.body as SignupType;

  try {
    checkPassword(body.password, res);
    UserModel.findOne({email: body.email})
      .then((user: any) => {
        if (user) {
          return res.status(218).json({
            message: 'User exists'
          });
        }
      });
    next();
  } catch (err) {
    next(err)
  }
}