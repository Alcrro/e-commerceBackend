import { IUserNotification } from '../../domain/entities/UserNotification';
import { NotificationRepository } from '../../domain/interfaces/NotificationRepository';

export class DeleteNotification {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}
  async execute(userId: string, notificationId: string) {
    return await this.notificationRepository.deleteNotification(
      userId,
      notificationId
    );
  }
}
