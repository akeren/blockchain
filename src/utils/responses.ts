import { Response } from 'express';
import { AppError } from '@src/errors';

export function debugResponse(error: AppError, res: Response): Response {
  const { status, statusCode, message, stack } = error;

  return res.status(statusCode).json({
    status,
    error,
    message,
    stack,
  });
}

export function errorResponse(error: AppError, res: Response): Response {
  const { status, statusCode, message } = error;

  return res.status(statusCode).json({
    status,
    code: res.statusCode,
    message,
  });
}

export function sendProductionErrors(error: AppError, res: Response): Response {
  if (error.isOperational) {
    return errorResponse(error, res);
  }

  throw new Error('[sendProductionError] Something critical went wrong!');
}
