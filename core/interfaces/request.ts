import {NextFunction, Request, Response} from "express";

export interface IRequest {
  handle(req: Request, res: Response, next: NextFunction): void;
}