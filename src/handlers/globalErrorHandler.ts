import { Request, Response, NextFunction } from 'express';
import { AppError } from '@src/errors';
import { debugResponse, sendProductionErrors } from '@src/utils';
import config from '@src/config';

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction): Response => {
  if (config.app.env === 'development') {
    return debugResponse(err, res);
  }

  return sendProductionErrors(err, res);
};

export { globalErrorHandler };
