import {
  IUserNotification,
  NotificationCategory,
  NotificationPriority,
} from './../../domain/entities/UserNotification';
import mongoose, { Schema, Document } from 'mongoose';

// Define a type that combines IUserNotification with Mongoose's Document properties
export interface IUserNotificationSchema
  extends Omit<IUserNotification, 'id'>,
    Document {
  userId: mongoose.Types.ObjectId; // Ensure userId uses ObjectId from Mongoose
}

const UserNotificationSchema = new Schema<IUserNotificationSchema>({
  userId: {
    type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId here
    required: true,
  },
  titleNotification: { type: String, required: true },
  message: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(NotificationCategory),
    required: true,
  },
  priority: {
    type: String,
    enum: Object.values(NotificationPriority),
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expirationDate: {
    type: Date,
  },
  viewed: { type: Boolean, default: false },
});

// Middleware to set expiration date based on priority
UserNotificationSchema.pre('save', function (next) {
  const now = new Date();
  switch (this.priority) {
    case NotificationPriority.High:
      now.setDate(now.getDate() + 7); // High-priority notifications expire in a week
      break;
    case NotificationPriority.Medium:
      now.setDate(now.getDate() + 5); // Medium-priority notifications expire in 5 days
      break;
    case NotificationPriority.Low:
      now.setDate(now.getDate() + 3); // Low-priority notifications expire in 3 days
      break;
  }
  this.expirationDate = now;
  next();
});

const UserNotification =
  mongoose.models.UserNotification ||
  mongoose.model<IUserNotificationSchema>(
    'UserNotification',
    UserNotificationSchema
  );

export default UserNotification;
