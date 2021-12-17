import {NextFunction, Request, Response} from "express";
import {IUserRequest} from "../../middlewares/auth";

export interface IRequest {
  handle(req: IUserRequest, res: Response, next: NextFunction): void;
}