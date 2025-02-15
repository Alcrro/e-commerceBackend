import { AuthPresenter } from '../../adapters/presenters/AuthPresenter';
import { UserPresenter } from '../../adapters/presenters/UserPresenter';

export interface AuthRepository {
  register(email: string, password: string): Promise<AuthPresenter>;

  /**
   * Authenticates a user with the provided credentials.
   * @param email - The user's email.
   * @param password - The plain-text password to validate.
   * @returns A Promise resolving to a boolean indicating success or failure.
   */
  authenticate(email: string, password: string): Promise<AuthPresenter | null>;

  /**
   * Generates a token for a user after successful authentication.
   * @param userId - The ID of the authenticated user.
   * @returns A Promise resolving to a JWT or session token as a string.
   */
  generateToken(userId: string): Promise<string>;

  /**
   * Validates a provided token to ensure its authenticity and validity.
   * @param token - The token to validate.
   * @returns A Promise resolving to the user ID if valid, or null if invalid.
   */
  validateToken(token: string): Promise<string | null>;

  /**
   * Resets a user's password.
   * @param email - The user's email.
   * @param newPassword - The new password (hashed before saving).
   * @returns A Promise resolving to a boolean indicating success or failure.
   */
  resetPassword(email: string, newPassword: string): Promise<boolean>;

  /**
   * Logs out a user by invalidating their current session or token.
   * @param token - The token to invalidate.
   * @returns A Promise resolving to a boolean indicating success or failure.
   */
  logout(token: string): Promise<boolean>;

  /**
   * Refreshes a user's token using a valid refresh token.
   * @param refreshToken - The refresh token.
   * @returns A Promise resolving to a new token as a string, or null if the refresh token is invalid.
   */
  refreshToken(refreshToken: string): Promise<string | null>;
}
