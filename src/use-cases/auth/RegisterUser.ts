import { UserPresenter } from '../../adapters/presenters/UserPresenter';
import { AuthRepository } from '../../domain/interfaces/AuthRepository';
import { UserRepository } from '../../domain/interfaces/UserRepository';

export class RegisterUser {
  constructor(
    private authRepository: AuthRepository,
    private userRepository: UserRepository
  ) {}

  async execute(email: string, password: string): Promise<UserPresenter> {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const existingUser = await this.userRepository.getByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    return await this.authRepository.register(email, password);
  }
}
