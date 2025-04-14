import { IUserNotification } from '../../domain/entities/UserNotification';
import { NotificationRepository } from '../../domain/interfaces/NotificationRepository';

export class UpdateNotification {
  constructor(private readonly INotificationRep: NotificationRepository) {}

  async execute(userId: string, notificationId: string) {
    return await this.INotificationRep.updateNotification(
      userId,
      notificationId
    );
  }
}
