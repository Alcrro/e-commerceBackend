import { Profile } from '../../domain/entities/Profile';

export class ProfilePresenter {
  static formatUserData(profile: any) {
    return {
      username: profile.username,
      avatarUrl: profile.avatarUrl,
      dateJoined: profile.userId.createdAt, // Formatting date to ISO string
    };
  }

  static formatUserList(profile: Profile[]) {
    return profile.map((profile) => ProfilePresenter.formatUserData(profile));
  }
}
