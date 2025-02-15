import { AuthRepository } from "../../domain/interfaces/AuthRepository";

// LogoutUserUseCase.ts
export class LogoutUser {
  constructor(private readonly authRepository: AuthRepository) {}

  /**
   * Executes the logout operation by invalidating the provided token.
   * @param token - The user's token to invalidate.
   * @returns A Promise resolving to a boolean indicating success or failure.
   */
  async execute(token: string): Promise<boolean> {
    if (!token) {
      throw new Error("Token must be provided for logout.");
    }

    // Invalidate the token via the repository.
    return await this.authRepository.logout(token);
  }
}
