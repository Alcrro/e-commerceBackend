import { Request, Response, NextFunction } from 'express';

/**
 * Global error handler middleware for handling errors in the application.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
