import { AuthRepository } from "../../domain/interfaces/AuthRepository";

export class ValidateToken {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string): Promise<{ userId: string } | null> {
    if (!token) {
      throw new Error("Token is required.");
    }

    const userId = await this.authRepository.validateToken(token);
    if (!userId) {
      throw new Error("Invalid or expired token.");
    }

    return { userId };
  }
}
