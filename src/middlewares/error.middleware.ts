import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';
  const errorCode: string = error.errorCode || '';

  res.status(status).json({ message, errorCode });
}

export default errorMiddleware;
