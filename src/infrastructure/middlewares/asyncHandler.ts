import { Request, Response, NextFunction } from 'express';

/**
 * Wraps an async function and forwards any error to the Express error handler.
 * @param fn - The asynchronous function to wrap
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
