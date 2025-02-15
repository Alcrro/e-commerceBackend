import { ProfilePresenter } from '../../adapters/presenters/ProfilePresenter';
import { UserRepository } from '../../domain/interfaces/UserRepository';

export class GetProfile {
  constructor(private readonly profile: UserRepository) {}

  async execute(token: string): Promise<ProfilePresenter | null> {
    return await this.profile.getProfile(token);
  }
}
