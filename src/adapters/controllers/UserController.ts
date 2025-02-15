import { NextFunction, Request, Response } from 'express';
import { GetAllUser } from '../../use-cases/user/GetAllUsers';
import { GetUserById } from '../../use-cases/user/GetUserById';
import { GetProfile } from '../../use-cases/user/getProfile';
import mongoose from 'mongoose';
import { extractToken } from '../../infrastructure/utils/tokenUtils';
import { sendSuccessResponse } from '../../infrastructure/utils/responseUtils';

// Extend Request type to include authToken
interface AuthenticatedRequest extends Request {
  authToken?: string;
}
export class UserController {
  constructor(
    private readonly getAllUsers: GetAllUser,
    private readonly getUserById: GetUserById,
    private readonly getProfile: GetProfile
  ) {}

  // Fetch all users
  fetchAllUsers = async (req: Request, res: Response) => {
    const users = await this.getAllUsers.execute();

    sendSuccessResponse(res, users, 'Successfully loaded');
  };

  fetchUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid user ID format' });
    }
    const user = await this.getUserById.execute(id);

    sendSuccessResponse(res, user, 'User fetched successfully!');
  };

  fetchProfile = async (req: AuthenticatedRequest, res: Response) => {
    const authHeader = req.headers;

    const token = extractToken(authHeader);
    if (!token) throw new Error('Token is Invalid');

    const profile = await this.getProfile.execute(token);

    if (!profile) {
      throw new Error('Profile not found!');
    }
    sendSuccessResponse(res, profile, 'Loaded Successfully');
  };
}
