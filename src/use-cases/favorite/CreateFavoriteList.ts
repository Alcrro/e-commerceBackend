import { FavoriteRepository } from '../../domain/interfaces/favoriteRepository';

export class CreateFavoriteList {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}
  async execute(userId: string, name: string) {
    const userLists = await this.favoriteRepository.getFavorite(userId);

    if (!userLists) {
      throw new Error('User list not found');
    }
    if (userLists?.nameList?.length >= 5)
      throw new Error('Max favorite lists reached (5)');

    return await this.favoriteRepository.addNewFavoriteList(userId, name);
  }
}
