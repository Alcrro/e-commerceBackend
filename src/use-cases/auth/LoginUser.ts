import { AuthPresenter } from '../../adapters/presenters/AuthPresenter';
import { UserPresenter } from '../../adapters/presenters/UserPresenter';
import { AuthRepository } from '../../domain/interfaces/AuthRepository';

export class LoginUser {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<{ token: string } | null> {
    const user = await this.authRepository.authenticate(email, password);
    if (!user) return null;
    // Format user data
    const { id } = AuthPresenter.formatAuthData(user);

    const token = await this.authRepository.generateToken(id);
    return { token };
  }
}
