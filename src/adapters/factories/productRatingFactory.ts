import { CreateRating } from '../../use-cases/productRating/createRating';
import { GetRatingByProductId } from '../../use-cases/productRating/getRatingByProductId';
import { ProductRatingController } from '../controllers/ProductRatingController';
import { DeleteRating } from '../../use-cases/productRating/deleteRating';
import { ProductRatingRepositoryImpl } from '../../infrastructure/database/ProductRatingImpl';

export const makeProductRatingFactory = (): ProductRatingController => {
  const ratingRepository = new ProductRatingRepositoryImpl();
  const createRatingUseCase = new CreateRating(ratingRepository);
  const getRatingByProductIdUseCase = new GetRatingByProductId(
    ratingRepository
  );
  const deleteRatingUseCase = new DeleteRating(ratingRepository);

  return new ProductRatingController(
    createRatingUseCase,
    getRatingByProductIdUseCase,
    deleteRatingUseCase
  );
};
