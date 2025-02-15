import { FavoriteImpl } from '../../infrastructure/database/FavoriteImpl';
import { AddToFavorite } from '../../use-cases/favorite/AddToFavorite';
import { CreateFavoriteList } from '../../use-cases/favorite/CreateFavoriteList';
import { DecreaseQuantityAndPrice } from '../../use-cases/favorite/DecreaseQuantityAndPrice';
import { GetFavorite } from '../../use-cases/favorite/GetFavorite';
import { RemoveFavorite } from '../../use-cases/favorite/RemoveFavorite';
import { FavoriteController } from '../controllers/FavoriteController';

export const makeFavoriteController = (): FavoriteController => {
  const favoriteRepository = new FavoriteImpl();
  const addToFavoriteUseCase = new AddToFavorite(favoriteRepository);
  const removeFavoriteUseCase = new RemoveFavorite(favoriteRepository);
  const getFavoriteUseCase = new GetFavorite(favoriteRepository);
  const decreaseQAndPFavoriteUseCase = new DecreaseQuantityAndPrice(
    favoriteRepository
  );
  const createFavoriteList = new CreateFavoriteList(favoriteRepository);
  return new FavoriteController(
    addToFavoriteUseCase,
    removeFavoriteUseCase,
    getFavoriteUseCase,
    decreaseQAndPFavoriteUseCase,
    createFavoriteList
  );
};
