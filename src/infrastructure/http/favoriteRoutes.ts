import { Router } from 'express';
import { makeFavoriteController } from '../../adapters/factories/FavoriteFactory';
import { asyncHandler } from '../middlewares/asyncHandler';

const favoriteRoute = Router();

const favoriteController = makeFavoriteController();

favoriteRoute.post(
  '/add-favorite',
  asyncHandler(favoriteController.AddToFavorite)
);
favoriteRoute.get(
  '/get-favorite/:slug?',
  asyncHandler(favoriteController.GetFavorite)
);
favoriteRoute.post(
  '/remove-favorite',
  asyncHandler(favoriteController.RemoveFavorite)
);
favoriteRoute.post(
  '/decrease-quantity',
  asyncHandler(favoriteController.DecreaseQAndP)
);
favoriteRoute.post(
  '/create-favoriteList',
  asyncHandler(favoriteController.CreateFavoriteList)
);

export default favoriteRoute;
