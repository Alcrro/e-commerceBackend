export interface User {
  id: string;
  email: string; // Email address
  password: string; // Hashed password
  createdAt?: Date; // Timestamp when the user was created
  updatedAt?: Date; // Timestamp when the user was last updated
}
