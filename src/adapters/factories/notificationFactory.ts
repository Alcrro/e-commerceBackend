import { NotificationRepositoryImpl } from './../../infrastructure/database/NotificationRepositoryImpl';
import { NotificationController } from '../controllers/NotificationController';
import { CreateNotification } from '../../use-cases/notification/CreateNotification';
import { GetNotification } from '../../use-cases/notification/getNotification';

export const makeNotificationController = (): NotificationController => {
  const notificationRepository = new NotificationRepositoryImpl();

  const createNotificationUseCase = new CreateNotification(
    notificationRepository
  );
  const getNotificationUseCase = new GetNotification(notificationRepository);

  return new NotificationController(
    createNotificationUseCase,
    getNotificationUseCase
  );
};
