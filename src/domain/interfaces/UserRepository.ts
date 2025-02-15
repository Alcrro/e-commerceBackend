import { ProfilePresenter } from '../../adapters/presenters/ProfilePresenter';
import { UserPresenter } from '../../adapters/presenters/UserPresenter';
import { User } from '../entities/User';

export interface UserRepository {
  getById(id: string): Promise<UserPresenter | null>; // Fetches a user by their ID
  getByEmail(email: string): Promise<UserPresenter | null>; // Fetches a user by their email
  getAll(): Promise<UserPresenter[]>; // Fetches all users
  getProfile(id: string): Promise<ProfilePresenter | null>;
  saveProfile(userId: string | undefined): Promise<ProfilePresenter>;
  updateProfile(id: string): Promise<ProfilePresenter>;
}
