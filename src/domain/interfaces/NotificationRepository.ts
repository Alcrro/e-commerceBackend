import { IUserNotification } from '../entities/UserNotification';

export interface NotificationRepository {
  create(
    notification: Omit<IUserNotification, 'id' | 'createdAt' | 'expirationDate'>
  ): Promise<Omit<IUserNotification, 'id' | 'createdAt' | 'expirationDate'>>;
  send(): Promise<IUserNotification>;
  getNotification(
    userId: string,
    id: string
  ): Promise<IUserNotification[] | IUserNotification | null>;
}
