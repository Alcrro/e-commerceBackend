import { Favorite } from '../entities/Favorite';

export interface FavoriteRepository {
  addToFavorite(
    token: string,
    productId: string,
    price: number
  ): Promise<Favorite>;
  getFavorite(userId: string, slug?: string): Promise<Favorite | null>;
  removeFavorite(userId: string, productId: string): Promise<Favorite>;
  decreaseQuantityAndPrice(
    userId: string,
    productId: string
  ): Promise<Favorite[] | []>;
  addNewFavoriteList(userId: string, newListName: string): Promise<Favorite>;
  deleteFavoriteList(userId: string, newListName: string): Promise<Favorite>;
  changeFavoriteList(
    userId: string,
    oldListName: string,
    newListName: string
  ): Promise<Favorite>;
}
