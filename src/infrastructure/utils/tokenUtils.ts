// src/infrastructure/utils/tokenUtils.ts
import jwt from 'jsonwebtoken';
import { config } from '../../../config';

/**
 * Extracts the token from the Authorization header.
 * @param headers - The HTTP headers object
 * @returns The extracted token or null if not found
 */
export function extractToken(headers: Record<string, any>): string | null {
  const authHeader = headers.authorization || headers.Authorization;

  if (!authHeader?.startsWith('Bearer ') || typeof authHeader !== 'string') {
    return null;
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        throw new Error('Session expired. Please log in again.');
      }
    }
  });
  return token;
}
