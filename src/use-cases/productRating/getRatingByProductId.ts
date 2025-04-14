import { Rating } from '../../domain/entities/Rating';
import { IRatingRepository } from '../../domain/interfaces/ratingRepository';

export class GetRatingByProductId {
  constructor(private readonly ratingRepository: IRatingRepository) {}

  async execute(productId: string): Promise<Rating[]> {
    return await this.ratingRepository.getByProductId(productId);
  }
}
