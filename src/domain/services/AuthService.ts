import { LoginUser } from '../../use-cases/auth/LoginUser';
import { LogoutUser } from '../../use-cases/auth/LogoutUser';
import { RefreshToken } from '../../use-cases/auth/RefreshToken';
import { RegisterUser } from '../../use-cases/auth/RegisterUser';
import { ResetPassword } from '../../use-cases/auth/ResetPassword';
import { ValidateToken } from '../../use-cases/auth/ValidateToken';

export class AuthService {
  constructor(
    private readonly registerUserUseCase: RegisterUser,
    private readonly loginUserUseCase: LoginUser,
    private readonly validateTokenUseCase: ValidateToken,
    private readonly resetPasswordUseCase: ResetPassword,
    private readonly logoutUserUseCase: LogoutUser,
    private readonly refreshTokenUseCase: RefreshToken
  ) {}

  async registerUser(email: string, password: string) {
    return await this.registerUserUseCase.execute(email, password);
  }

  // Other methods
}
