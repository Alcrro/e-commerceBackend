import { AuthRepository } from "../../domain/interfaces/AuthRepository";

export class RefreshToken {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string): Promise<{ newToken: string } | null> {
    if (!token) {
      throw new Error("Token is required.");
    }

    const userId = await this.authRepository.validateToken(token);
    if (!userId) {
      throw new Error("Invalid or expired token.");
    }

    const newToken = await this.authRepository.generateToken(userId);
    return { newToken };
  }
}
