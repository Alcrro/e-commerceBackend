// src/domain/interfaces/IRatingRepository.ts

import { Rating } from '../entities/Rating';

export interface IRatingRepository {
  // Create a new rating
  create(rating: Rating): Promise<Rating>;

  // Get ratings by product ID
  getByProductId(productId: string): Promise<Rating[]>;

  // Get ratings by user ID
  getByUserId(userId: string): Promise<Rating[]>;

  // Get a specific rating by user and product
  getByUserAndProduct(
    userId: string,
    productId: string
  ): Promise<Rating | null>;

  // Update an existing rating
  update(rating: Rating): Promise<Rating>;

  // Delete a rating
  delete(ratingId: string): Promise<void>;
}
