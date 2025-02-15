import { UserRepository } from '../../domain/interfaces/UserRepository';

export class GetUserById {
  constructor(private useRepository: UserRepository) {}

  async execute(id: string) {}
}
