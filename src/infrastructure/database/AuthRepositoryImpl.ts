import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../../domain/interfaces/AuthRepository';
import UserModel from '../model/UserModel';
import { config } from '../../../config';
import { UserPresenter } from '../../adapters/presenters/UserPresenter';
import { AuthPresenter } from '../../adapters/presenters/AuthPresenter';

export class AuthRepositoryImpl implements AuthRepository {
  private readonly tokenStore: Map<string, boolean> = new Map(); // Example token store

  async logout(token: string): Promise<boolean> {
    // JWT-based logout is usually handled client-side by deleting the token.
    return true;
  }

  async refreshToken(refreshToken: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(refreshToken, config.jwtSecret) as {
        userId: string;
      };
      return this.generateToken(decoded.userId);
    } catch {
      return null;
    }
  }

  async register(email: string, password: string): Promise<AuthPresenter> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ email, password: hashedPassword });
    return AuthPresenter.formatAuthData(user);
  }

  async authenticate(
    email: string,
    password: string
  ): Promise<AuthPresenter | null> {
    const user = await UserModel.findOne({ email });

    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword ? user : null;
  }

  async generateToken(userId: string): Promise<string> {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1d' });
  }

  async validateToken(token: string): Promise<string | null> {
    try {
      const decoded: any = jwt.verify(token, config.jwtSecret);
      return decoded.userId;
    } catch {
      return null;
    }
  }

  async resetPassword(email: string, newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
      const user = await UserModel.findOne({ where: { email } });
      if (!user) return false;

      user.password = hashedPassword;
      await user.save();
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      return false;
    }
  }
}
