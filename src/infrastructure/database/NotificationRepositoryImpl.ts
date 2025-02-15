import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../../config';
import { IUserNotification } from '../../domain/entities/UserNotification';
import { NotificationRepository } from '../../domain/interfaces/NotificationRepository';
import UserNotification from '../model/UserNotificationModel';
import mongoose, { Types } from 'mongoose';

export class NotificationRepositoryImpl implements NotificationRepository {
  async getNotification(
    token: string,
    id: string
  ): Promise<IUserNotification[] | IUserNotification> {
    const verifyToken = jwt.verify(token, config.jwtSecret) as JwtPayload;

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(verifyToken.userId)) {
      throw new Error('Invalid user ID format');
    }

    // Use mongoose.Types.ObjectId
    const objId = new Types.ObjectId(verifyToken.userId); // or use createFromTime if it's a timestamp

    const notId = new Types.ObjectId(id);

    if (!id) {
      const getNotification = await UserNotification.find({
        userId: objId,
      });
      return getNotification;
    } else {
      const getNotification = await UserNotification.find({
        userId: objId,
        _id: notId,
      });

      return getNotification;
    }
  }
  async create(
    notification: Omit<IUserNotification, 'id' | 'createdAt' | 'expirationDate'>
  ): Promise<Omit<IUserNotification, 'id' | 'createdAt' | 'expirationDate'>> {
    const userNotification = await UserNotification.create(notification);

    const userNotificationSaved = await userNotification.save();

    return userNotificationSaved;
  }

  send(): Promise<IUserNotification> {
    throw new Error('Method not implemented.');
  }
}
