import { IUserNotification } from '../../domain/entities/UserNotification';
import { NotificationRepository } from '../../domain/interfaces/NotificationRepository';

export class CreateNotification {
  constructor(private readonly notification: NotificationRepository) {}
  async execute(
    notification: Omit<IUserNotification, 'id' | 'createdAt' | 'expirationDate'>
  ): Promise<IUserNotification> {
    return await this.notification.create(notification);
  }
}
