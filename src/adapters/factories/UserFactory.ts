import { UserController } from '../controllers/UserController';
import { SequelizeUserRepository } from '../../infrastructure/database/SequalizeUserRepository';
import { GetAllUser } from '../../use-cases/user/GetAllUsers';
import { GetUserById } from '../../use-cases/user/GetUserById';
import { GetProfile } from '../../use-cases/user/getProfile';

export const makeUserController = (): UserController => {
  const userRepository = new SequelizeUserRepository();
  const getAllUsers = new GetAllUser(userRepository);
  const getUserById = new GetUserById(userRepository);
  const getProfile = new GetProfile(userRepository);

  return new UserController(getAllUsers, getUserById, getProfile);
};
