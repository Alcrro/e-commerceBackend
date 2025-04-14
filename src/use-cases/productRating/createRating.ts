import { Rating } from '../../domain/entities/Rating';
import { IRatingRepository } from '../../domain/interfaces/ratingRepository';

export class CreateRating {
  constructor(private readonly ratingRepository: IRatingRepository) {}
  async execute(ratingData: Rating): Promise<Rating> {
    return await this.ratingRepository.create(ratingData);
  }
}
