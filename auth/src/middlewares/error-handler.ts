import { Request, Response, NextFunction } from 'express';

interface CustomError {
  statusCode?: number;
  message: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
  const message = err.message || 'Something went wrong';

  res.status(statusCode).send({
    errors: [{ message }],
  });
};