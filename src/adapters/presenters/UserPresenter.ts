import { User } from '../../domain/entities/User';

export class UserPresenter {
  static formatUserData(user: any) {
    return {
      email: user.email,
      dateJoined: user.createdAt.toISOString(), // Formatting date to ISO string
      lastLogin: user.updatedAt.toISOString(), // Formatting date
    };
  }

  static formatUserList(users: User[]) {
    return users.map((user) => UserPresenter.formatUserData(user));
  }
}
