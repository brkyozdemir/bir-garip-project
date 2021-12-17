import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
const JWT_KEY = process.env.JWT_SECRET || "123456"

export interface IUserRequest extends Request {
  user: any
}

exports.authenticateJWT = (req: IUserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_KEY, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      message: 'Unauthorized.'
    });
  }
};