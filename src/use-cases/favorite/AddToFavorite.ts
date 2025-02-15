import { Favorite } from '../../domain/entities/Favorite';
import { FavoriteRepository } from '../../domain/interfaces/favoriteRepository';

export class AddToFavorite {
  constructor(private readonly addToFavorite: FavoriteRepository) {}

  async execute(
    token: string,
    productId: string,
    price: number
  ): Promise<Favorite> {
    return await this.addToFavorite.addToFavorite(token, productId, price);
  }
}
