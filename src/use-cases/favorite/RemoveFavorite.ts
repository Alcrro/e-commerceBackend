import { Favorite } from '../../domain/entities/Favorite';
import { FavoriteRepository } from '../../domain/interfaces/favoriteRepository';

export class RemoveFavorite {
  constructor(private readonly removeFavorite: FavoriteRepository) {}

  async execute(userId: string, productId: string): Promise<Favorite[] | []> {
    return await this.removeFavorite.removeFavorite(userId, productId);
  }
}
