import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { makeNotificationController } from '../../adapters/factories/notificationFactory';

export const notificationRouter = Router();
export const notificationController = makeNotificationController();

notificationRouter.post(
  '/notification',
  asyncHandler(notificationController.createNotification)
);
notificationRouter.get(
  '/get-notification',
  asyncHandler(notificationController.fetchNotification)
);
notificationRouter.get(
  '/get-notification/:id',
  asyncHandler(notificationController.fetchNotification)
);
