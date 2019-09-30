import { Request, Response, NextFunction, Router } from 'express';
import * as ErrroHandler from '../utils/ErrorHandler';

const handle404Error = (route: Router) => {
  route.use((req: Request, res: Response) => {
    ErrroHandler.notFoundError();
  });
};

const handleClientError = (route: Router) => {
  route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrroHandler.clientError(err, res, next);
  });
};

const handleServerError = (route: Router) => {
  route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrroHandler.serverError(err, res, next);
  });
};

export default [handle404Error, handleClientError, handleServerError];
