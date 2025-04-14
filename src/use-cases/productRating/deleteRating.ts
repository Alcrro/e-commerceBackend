import { IRatingRepository } from '../../domain/interfaces/ratingRepository';

export class DeleteRating {
  constructor(private readonly ratingRepository: IRatingRepository) {}
  async execute(ratingId: string): Promise<void> {
    return await this.ratingRepository.delete(ratingId);
  }
}
