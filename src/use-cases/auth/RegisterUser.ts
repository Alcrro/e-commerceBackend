import { UserPresenter } from '../../adapters/presenters/UserPresenter';
import { AuthRepository } from '../../domain/interfaces/AuthRepository';
import { UserRepository } from '../../domain/interfaces/UserRepository';
import userRouter from '../../infrastructure/http/UserRoute';

export class RegisterUser {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<UserPresenter> {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    return await this.authRepository.register(email, password);
  }
}
