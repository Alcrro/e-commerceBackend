import mongoose from 'mongoose';
import { Rating } from '../../domain/entities/Rating';
import { IRatingRepository } from '../../domain/interfaces/ratingRepository';
import { RatingModel } from '../model/RatingSchema';

export class ProductRatingRepositoryImpl implements IRatingRepository {
  async create(rating: Rating): Promise<Rating> {
    const createRating = await RatingModel.create(rating);
    const saveCreateRating = createRating.save();
    return saveCreateRating;
  }
  async getByProductId(productId: string): Promise<Rating[]> {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid product ID');
    }
    const getRatingById = await RatingModel.find({ productId });

    return getRatingById;
  }
  getByUserId(userId: string): Promise<Rating[]> {
    throw new Error('Method not implemented.');
  }
  getByUserAndProduct(
    userId: string,
    productId: string
  ): Promise<Rating | null> {
    throw new Error('Method not implemented.');
  }
  update(rating: Rating): Promise<Rating> {
    throw new Error('Method not implemented.');
  }
  delete(ratingId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
