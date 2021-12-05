import {IRequest} from "../../core/interfaces/request";
import {NextFunction, Request, Response} from "express";

const User = require('../../users/models/User');

type SignupType = {
  email: string
  password: string
  username: string
}

export class SingupRequest implements IRequest {
  private static checkPassword(password: string, res: Response) {
    if (password === null || password === undefined) {
      return res.status(400).json({
        _message: 'Password is required'
      });
    }
  }

  handle(req: Request, res: Response, next: NextFunction): void {
    const body = req.body as SignupType;

    try {
      SingupRequest.checkPassword(body.password, res);
      // this.checkPassword(body.password, res)
      User.findOne({email: body.email})
        .then((user: any) => {
          if (user) {
            return res.status(400).json({
              message: 'User exists'
            });
          }
        });
      next();
    } catch (err) {
      next(err)
    }
  }
}