import { AuthRepository } from "../../domain/interfaces/AuthRepository";

export class ResetPassword {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, newPassword: string): Promise<boolean> {
    if (!email || !newPassword) {
      throw new Error("Email and new password are required.");
    }

    const success = await this.authRepository.resetPassword(email, newPassword);
    if (!success) {
      throw new Error("Failed to reset password.");
    }

    return true;
  }
}
