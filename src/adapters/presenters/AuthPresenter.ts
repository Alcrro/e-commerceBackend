import { User } from '../../domain/entities/User';

export class AuthPresenter {
  static formatAuthData(user: any) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  static formatAuthList(users: User[]) {
    return users.map((user) => AuthPresenter.formatAuthData(user));
  }
}
