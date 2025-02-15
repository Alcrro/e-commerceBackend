import { Router } from 'express';
import { AuthController } from '../../adapters/controllers/AuthController';
import { AuthRepositoryImpl } from '../database/AuthRepositoryImpl';
import { RegisterUser } from '../../use-cases/auth/RegisterUser';
import { LoginUser } from '../../use-cases/auth/LoginUser';
import { ValidateToken } from '../../use-cases/auth/ValidateToken';
import { ResetPassword } from '../../use-cases/auth/ResetPassword';
import { asyncHandler } from '../middlewares/asyncHandler';

const authRouter = Router();

// Dependency Injection
const authRepository = new AuthRepositoryImpl();
const registerUser = new RegisterUser(authRepository);
const loginUser = new LoginUser(authRepository);
const validateToken = new ValidateToken(authRepository);
const resetPassword = new ResetPassword(authRepository);

export const authController = new AuthController(
  registerUser,
  loginUser,
  validateToken,
  resetPassword
);

// Routes
authRouter.post('/register', asyncHandler(authController.register));
authRouter.post('/login', asyncHandler(authController.login));
authRouter.post('/validate', asyncHandler(authController.validate));
authRouter.post('/reset-password', asyncHandler(authController.reset));
authRouter.post('/logout', asyncHandler(authController.logout));

export default authRouter;
