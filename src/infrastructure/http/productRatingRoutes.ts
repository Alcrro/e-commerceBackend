import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { makeProductRatingFactory } from '../../adapters/factories/productRatingFactory';

export const productRatingRouter = Router();
const productRatingController = makeProductRatingFactory();

productRatingRouter.post(
  '/create-product-rating',
  asyncHandler(productRatingController.CreateRating)
);

productRatingRouter.get(
  '/get-rating-by-productId/:productId',
  asyncHandler(productRatingController.GetRatingByProduct)
);
