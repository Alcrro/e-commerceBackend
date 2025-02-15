// src/adapters/validators/UserValidator.ts

export class UserValidator {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  static validatePassword(password: string): boolean {
    // Example: password must be at least 8 characters
    return password.length >= 8;
  }

  static validate(email: string, password: string): void {
    if (!email || !password) {
      throw new Error('Email and password are required!');
    }

    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format!');
    }

    if (!this.validatePassword(password)) {
      throw new Error('Password must be at least 8 characters long!');
    }
  }

  // Specific validation for login (can be reused in the controller)
  static validateLogin(email: string, password: string): void {
    if (!email || !password) {
      throw new Error('Email and password are required!');
    }

    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format!');
    }
  }
}
