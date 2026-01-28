import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Incoming Request: ${req.method} and ${req.url}`);
  next();
}
