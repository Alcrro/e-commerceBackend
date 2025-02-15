import { Request, Response } from 'express';
import { RegisterUser } from '../../use-cases/auth/RegisterUser';
import { LoginUser } from '../../use-cases/auth/LoginUser';
import { ValidateToken } from '../../use-cases/auth/ValidateToken';
import { ResetPassword } from '../../use-cases/auth/ResetPassword';
import { extractToken } from '../../infrastructure/utils/tokenUtils';
import {
  sendSuccessResponse,
  setCookieResponse,
} from '../../infrastructure/utils/responseUtils';
import { UserValidator } from '../validators/CreateUserValidator';

export class AuthController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly loginUser: LoginUser,
    private readonly validateToken: ValidateToken,
    private readonly resetPassword: ResetPassword
  ) {}

  register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    UserValidator.validate(email, password);

    const user = await this.registerUser.execute(email, password);

    sendSuccessResponse(res, user, 'You are successfully registered!', 201);
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    UserValidator.validateLogin(email, password);
    const token = await this.loginUser.execute(email, password);

    // Ensure token is valid
    if (!token) {
      throw new Error('Login failed, token is empty.');
    }

    // Use the setCookieResponse utility to set the cookie and send the response
    setCookieResponse(res, token.token, 'Login successful');
  };

  validate = async (req: Request, res: Response) => {
    const token = extractToken(req.headers);

    if (!token) throw new Error('TOken is invalid');

    // Validate the token
    const userId = await this.validateToken.execute(token);
    sendSuccessResponse(res, userId, 'Token is Valid');
  };

  async reset(req: Request, res: Response): Promise<void> {
    const { email, newPassword } = req.body;
    const success = await this.resetPassword.execute(email, newPassword);

    sendSuccessResponse(res, success, 'Password is sended successfully');
  }
  logout = async (req: any, res: any) => {
    // Clear the auth token cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    sendSuccessResponse(res, null, 'Logged out successfully');
  };
}
