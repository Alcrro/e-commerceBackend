// Define the notification categories as an enum for clarity and type safety
export enum NotificationCategory {
  AddressError = 'Address Error',
  PhoneNumberError = 'Phone Number Error',
  GeneralInformation = 'General Information',
  // Add more categories as needed
}

// Define the notification priorities as an enum
export enum NotificationPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

// Define the Notification interface

export interface IUserNotification {
  id?: string; // Unique identifier for the notification
  titleNotification: string; // Title of the notification
  message: string; // Detailed message of the notification
  category: NotificationCategory; // Category of the notification
  priority: NotificationPriority; // Priority of the notification
  createdAt?: Date; // Timestamp when the notification was created
  expirationDate?: Date; // Timestamp when the notification will expire
}
