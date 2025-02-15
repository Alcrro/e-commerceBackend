import { IUserNotification } from '../../domain/entities/UserNotification';
import { NotificationRepository } from '../../domain/interfaces/NotificationRepository';

export class GetNotification {
  constructor(private readonly notification: NotificationRepository) {}

  async execute(
    userId: string,
    id: string
  ): Promise<Omit<IUserNotification[], 'id'> | IUserNotification | null> {
    return await this.notification.getNotification(userId, id);
  }
}
