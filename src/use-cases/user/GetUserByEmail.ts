import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class getByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    return await this.userRepository.getByEmail(email);
  }
}
