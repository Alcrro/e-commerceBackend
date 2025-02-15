import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate and extract the token from the Authorization header.
 */
interface AuthRequest extends Request {
  authToken?: string;
}

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    req.authToken = authHeader.split(' ')[1]; // Extract and attach token
    next(); // Exit after calling next()
  }

  res.status(401).json({ message: 'Authorization token missing or invalid' });
}
