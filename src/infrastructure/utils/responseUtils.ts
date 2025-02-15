import { Response } from 'express';

type ApiResponse = {
  success: boolean;
  message: string;
  data?: any;
};

/**
 * Sends a standardized success response.
 * @param res - Express response object
 * @param data - Data to include in the response
 * @param message - Optional message
 * @param statusCode - HTTP status code (default: 200)
 */
export const sendSuccessResponse = (
  res: Response,
  data: any,
  message = 'Request was successful',
  statusCode = 200
): Response => {
  const response: ApiResponse = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

/**
 * Sets a cookie on the response and sends a JSON response.
 * @param res The Express Response object.
 * @param token The token to set in the cookie.
 * @param message The message to send in the JSON response.
 * @param status The status code for the response (default is 200).
 */
export const setCookieResponse = (
  res: Response,
  token: string,
  message: string,
  status: number = 200
): void => {
  res
    .cookie('authToken', token, {
      httpOnly: true, // Make the cookie httpOnly for security
      secure: process.env.NODE_ENV === 'production', // Only set the secure flag in production
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Adjust SameSite setting based on environment
      maxAge: 86400000, // 1 day in milliseconds
      path: '/', // Cookie is valid for the entire domain
    })
    .status(status)
    .json({ message });
};

/**
 * Sends a standardized error response.
 * @param res - Express response object
 * @param message - Error message
 * @param statusCode - HTTP status code (default: 400)
 */
export const sendErrorResponse = (
  res: Response,
  message = 'An error occurred',
  statusCode = 400
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
  };
  return res.status(statusCode).json(response);
};
