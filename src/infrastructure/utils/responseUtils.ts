import { Response } from 'express';

type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  statusCode: number;
  meta?: {
    count?: number;
    pagination?: {
      currentPage: number;
      totalPages: number;
      limit: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
  data?: T;
};

type ApiErrorResponse = {
  success: false;
  message: string;
  statusCode: number;
  error: {
    code: string;
    details?: string;
    validationErrors?: Record<string, string>; // Optional field for validation errors
  };
};

/**
 * Sends a standardized success response.
 * @param res - Express response object
 * @param data - Data to include in the response
 * @param message - Optional message
 * @param statusCode - HTTP status code (default: 200)
 */
export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  message = 'Request was successful',
  statusCode = 200,
  meta?: ApiResponse<T>['meta']
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    statusCode,
    meta,
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
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only set `secure` in production (HTTPS required)
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // Use `strict` in production for more security
      maxAge: 86400000, // 1 day in milliseconds
      path: '/', // Available for the whole domain
      domain:
        process.env.NODE_ENV === 'production' ? '.lucruri-utile.ro' : undefined, // Set domain only in production
    })
    .status(status)
    .json({ message });
};
/**
 * Sends a standardized error response.
 * @param res - Express response object
 * @param message - Error message
 * @param statusCode - HTTP status code (default: 400)
 * @param errorCode - Custom error code for easier debugging
 * @param details - Additional error details (optional)
 * @param validationErrors - Object containing validation error messages (optional)
 */
export const sendErrorResponse = (
  res: Response,
  message = 'An error occurred',
  statusCode = 400,
  errorCode = 'GENERAL_ERROR',
  details?: string,
  validationErrors?: Record<string, string>
): Response => {
  const response: ApiErrorResponse = {
    success: false,
    message,
    statusCode,
    error: {
      code: errorCode,
      details,
      validationErrors,
    },
  };
  return res.status(statusCode).json(response);
};
