import { Types } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { NotificationRepositoryImpl } from '../../infrastructure/database/NotificationRepositoryImpl';
import { IUserNotification } from '../../domain/entities/UserNotification';
import { sendSuccessResponse } from '../../infrastructure/utils/responseUtils';
import { extractToken } from '../../infrastructure/utils/tokenUtils';
import { CreateNotification } from '../../use-cases/notification/CreateNotification';
import { GetNotification } from '../../use-cases/notification/getNotification';

export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotification,
    private readonly getNotificationUseCase: GetNotification
  ) {}

  createNotification = async (req: Request, res: Response) => {
    const { userId, titleNotification, message, category, priority } = req.body;

    if (!userId || !titleNotification || !message || !category) {
      // Validate required fields
      res.status(400).json({
        message:
          'Missing required fields: userId, titleNotification, message, or category.',
      });
    }

    // Validate userId as an ObjectId
    if (!Types.ObjectId.isValid(userId)) {
      res.status(400).json({
        message: 'Invalid userId. It must be a valid ObjectId.',
      });
    }

    // Construct the notification object
    const notification: IUserNotification & { userId: Types.ObjectId } = {
      userId,
      titleNotification,
      message,
      category,
      priority: priority,
    };

    // Save the notification
    const savedNotification = await this.createNotificationUseCase.execute(
      notification
    );

    sendSuccessResponse(res, savedNotification, 'Saved successfully', 201);
  };

  fetchNotification = async (req: Request, res: Response) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers;

    const token = extractToken(authHeader);

    if (!token) throw new Error('Token is invalid');
    const { id } = req.params;

    const fetchNotification = await this.getNotificationUseCase.execute(
      token,
      id
    );
    sendSuccessResponse(res, fetchNotification, 'loaded Successfully', 201);
  };
}
