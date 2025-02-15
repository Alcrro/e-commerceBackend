import { Favorite } from '../../domain/entities/Favorite';
import { FavoriteRepository } from '../../domain/interfaces/favoriteRepository';

export class GetFavorite {
  constructor(private readonly removeFavorite: FavoriteRepository) {}

  async execute(userId: string, slug: string): Promise<Favorite | null> {
    return await this.removeFavorite.getFavorite(userId, slug);
  }
}
