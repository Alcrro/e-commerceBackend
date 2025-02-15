import { Favorite } from '../../domain/entities/Favorite';
import { FavoriteRepository } from '../../domain/interfaces/favoriteRepository';

export class DecreaseQuantityAndPrice {
  constructor(private readonly decreaseQAndPriceFavorite: FavoriteRepository) {}

  async execute(token: string, productId: string): Promise<Favorite[] | []> {
    return await this.decreaseQAndPriceFavorite.decreaseQuantityAndPrice(
      token,
      productId
    );
  }
}
