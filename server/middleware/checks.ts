import { HTTP400Error } from './../utils/httpErrors';
import { Request, Response, NextFunction } from 'express';
export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.q) {
    throw new HTTP400Error('Missing Query parameter');
  } else {
    next();
  }
};
