import { NotificationRepositoryImpl } from './../../infrastructure/database/NotificationRepositoryImpl';
import { NotificationController } from '../controllers/NotificationController';
import { CreateNotification } from '../../use-cases/notification/CreateNotification';
import { GetNotification } from '../../use-cases/notification/getNotification';
import { UpdateNotification } from '../../use-cases/notification/updateNotification';
import { DeleteNotification } from '../../use-cases/notification/deleteNotification';

export const makeNotificationController = (): NotificationController => {
  const notificationRepository = new NotificationRepositoryImpl();

  const createNotificationUseCase = new CreateNotification(
    notificationRepository
  );
  const getNotificationUseCase = new GetNotification(notificationRepository);
  const updateNotificationUseCase = new UpdateNotification(
    notificationRepository
  );
  const deleteNotificationUseCase = new DeleteNotification(
    notificationRepository
  );

  return new NotificationController(
    createNotificationUseCase,
    getNotificationUseCase,
    updateNotificationUseCase,
    deleteNotificationUseCase
  );
};
