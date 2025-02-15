import { UserPresenter } from '../../adapters/presenters/UserPresenter';
import { UserRepository } from '../../domain/interfaces/UserRepository';

export class GetAllUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserPresenter[]> {
    // Fetch users from the repository
    return await this.userRepository.getAll();
  }
}
