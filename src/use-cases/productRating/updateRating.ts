import { Rating } from '../../domain/entities/Rating';
import { IRatingRepository } from '../../domain/interfaces/ratingRepository';

export class updateRating {
  constructor(private readonly ratingRepository: IRatingRepository) {}

  async execute(rating: Rating): Promise<Rating> {
    return await this.ratingRepository.update(rating);
  }
}
