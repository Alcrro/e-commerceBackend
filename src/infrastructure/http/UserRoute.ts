import { Router } from 'express';
import { makeUserController } from '../../adapters/factories/UserFactory';
import { asyncHandler } from '../middlewares/asyncHandler';
import { extractToken } from '../utils/tokenUtils';

const userRouter = Router();
const userController = makeUserController();

// Define routes
userRouter.get('/users', asyncHandler(userController.fetchAllUsers)); // Fetching all users
userRouter.get(
  '/get-profile',

  asyncHandler(userController.fetchProfile)
);

export default userRouter;
