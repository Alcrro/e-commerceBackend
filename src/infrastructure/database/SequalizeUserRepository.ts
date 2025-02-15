import { ProfilePresenter } from '../../adapters/presenters/ProfilePresenter';
import { UserPresenter } from '../../adapters/presenters/UserPresenter';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/interfaces/UserRepository';
import UserModel from '../model/UserModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../../config';
import ProfileModel from '../model/ProfileModel';
import mongoose, { Types } from 'mongoose';

export class SequelizeUserRepository implements UserRepository {
  async saveProfile(userId: string): Promise<ProfilePresenter> {
    const profile = await ProfileModel.create({ userId });

    return profile;
  }
  updateProfile(id: string): Promise<ProfilePresenter> {
    throw new Error('Method not implemented.');
  }

  async getProfile(token: string): Promise<ProfilePresenter | null> {
    const verifyToken = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(verifyToken.userId)) {
      throw new Error('Invalid user ID format');
    }

    // Use mongoose.Types.ObjectId
    const objId = new Types.ObjectId(verifyToken.userId); // or use createFromTime if it's a timestamp

    const profile = await ProfileModel.findOne({ userId: objId }).populate(
      'userId'
    ); // Populate only 'email' and 'name';

    if (!profile) {
      console.log('Profile not found for userId:', objId);
      return null;
    }

    return ProfilePresenter.formatUserData(profile);
  }

  // Get a user by their ID (you can implement this later)
  async getById(id: string): Promise<UserPresenter | null> {
    const user = await UserModel.findById(id);

    if (!user) return null;

    return user;
  }

  public async getByEmail(email: string): Promise<UserPresenter | null> {
    const getUser = await UserModel.findOne({ email }).exec();

    if (!getUser) return null;

    return UserPresenter.formatUserData(getUser); // Otherwise return the plain object (if lean() was used)
  }

  public async getAll(): Promise<UserPresenter[]> {
    const users = await UserModel.find({});
    return UserPresenter.formatUserList(users); // Use toObject and cast to User
  }
}
