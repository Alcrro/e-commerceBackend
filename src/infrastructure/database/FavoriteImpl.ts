import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../../config';
import { Favorite } from '../../domain/entities/Favorite';
import { FavoriteRepository } from '../../domain/interfaces/favoriteRepository';
import FavoriteModel from '../model/FavoriteModel';

export class FavoriteImpl implements FavoriteRepository {
  async addNewFavoriteList(
    userId: string,
    newListName: string
  ): Promise<Favorite> {
    // Verify the token and extract the user ID
    const verifyToken = jwt.verify(userId, config.jwtSecret) as JwtPayload;
    const userIdVerified = verifyToken.userId;

    // Find the user's favorite document
    const favorite = await FavoriteModel.findOne({ userId: userIdVerified });

    if (!favorite) {
      throw new Error('Favorite not found');
    }

    // Ensure the new list name does not exceed the limit of 5
    if (favorite.nameList.length >= 5) {
      throw new Error('You can only have up to 5 favorite lists.');
    }

    // Prevent duplicates
    if (favorite.nameList.includes(newListName)) {
      throw new Error('List name already exists.');
    }

    // Add the new list name
    favorite.nameList.push(newListName);
    await favorite.save();

    return favorite;
  }
  async deleteFavoriteList(
    userId: string,
    listName: string
  ): Promise<Favorite> {
    // Verify the token and extract the user ID
    const verifyToken = jwt.verify(userId, config.jwtSecret) as JwtPayload;
    const userIdVerified = verifyToken.userId;

    // Find the user's favorite document
    const favorite = await FavoriteModel.findOne({ userId: userIdVerified });

    if (!favorite) {
      throw new Error('Favorite not found');
    }

    // Prevent deleting the default "favorite" list
    if (listName === 'favorite') {
      throw new Error('You cannot delete the default favorite list.');
    }

    // Ensure the list exists before trying to remove it
    if (!favorite.list.includes(listName)) {
      throw new Error('List name not found.');
    }

    // Remove the list name
    favorite.list = favorite.list.filter((name: any) => name !== listName);

    // Remove products associated with the deleted list
    favorite.productCartList = favorite.productCartList.filter(
      (product: any) => product.listName !== listName
    );

    await favorite.save();
    return favorite;
  }

  async changeFavoriteList(
    userId: string,
    oldListName: string,
    newListName: string
  ): Promise<Favorite> {
    // Verify the token and extract the user ID
    const verifyToken = jwt.verify(userId, config.jwtSecret) as JwtPayload;
    const userIdVerified = verifyToken.userId;

    // Find the user's favorite document
    const favorite = await FavoriteModel.findOne({ userId: userIdVerified });

    if (!favorite) {
      throw new Error('Favorite not found');
    }

    // Prevent renaming the default "favorite" list
    if (oldListName === 'favorite') {
      throw new Error('You cannot rename the default favorite list.');
    }

    // Ensure the old list name exists
    if (!favorite.list.includes(oldListName)) {
      throw new Error('List name not found.');
    }

    // Prevent duplicates
    if (favorite.list.includes(newListName)) {
      throw new Error('A list with this name already exists.');
    }

    // Replace the old list name with the new one
    favorite.list = favorite.list.map((name: any) =>
      name === oldListName ? newListName : name
    );

    await favorite.save();
    return favorite;
  }

  // Remove the product completely from the favorite list
  async removeFavorite(token: string, productId: string): Promise<Favorite> {
    try {
      // Verify the token and extract the user ID
      const verifyToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
      const userId = verifyToken.userId;

      // Find the user's favorite document
      const favorite = await FavoriteModel.findOne({ userId });

      if (!favorite) {
        throw new Error('Favorite not found');
      }

      // Find the product in the favorites array
      const productIndex = favorite.productCartList.findIndex(
        (product: any) => product.productId.toString() === productId
      );

      if (productIndex === -1) {
        throw new Error('Product not found in favorites');
      }

      const product = favorite.productCartList[productIndex];

      // Remove the product's price from the total price
      favorite.totalPrice -= product.price * product.quantity;

      // Remove the product from the products array
      favorite.productCartList.splice(productIndex, 1);
      await favorite.save();

      // Return the updated list of products
      return favorite;
    } catch (error) {
      console.error('Error removing product:', error);
      throw new Error('Error removing product');
    }
  }

  // Decrease the product quantity by 1 and adjust the total price
  async decreaseQuantityAndPrice(
    token: string,
    productId: string
  ): Promise<Favorite[] | []> {
    try {
      // Verify the token and extract the user ID
      const verifyToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
      const userId = verifyToken.userId;

      // Find the user's favorite document
      const favorite = await FavoriteModel.findOne({ userId });

      if (!favorite) {
        throw new Error('Favorite not found');
      }

      // Find the product in the favorites array
      const productIndex = favorite.productCartList.findIndex(
        (product: any) => product.productId.toString() === productId
      );

      if (productIndex === -1) {
        throw new Error('Product not found in favorites');
      }

      const product = favorite.productCartList[productIndex];

      // Decrease the quantity by 1
      favorite.productCartList[productIndex].quantity -= 1;

      // Decrease the total price by the product's price
      favorite.totalPrice -= product.price;

      // Save the updated favorite document
      await favorite.save();

      return favorite;
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      throw new Error('Error decreasing quantity');
    }
  }

  async getFavorite(token: string, slug: string): Promise<Favorite | null> {
    // Verify the token and extract the user ID
    const verifyToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const userId = verifyToken.userId;
    // Base query: Find favorite by userId
    const matchQuery: any = { userId };

    const projectQuery: any = {
      productCartList: 1, // Default: Return all productCartList items
      nameList: 1,
      totalPrice: 1,
      userId: 1,
      createdAt: 1,
      updatedAt: 1,
    };

    // Apply filtering only if slug is provided
    if (slug) {
      projectQuery.productCartList = {
        $filter: {
          input: '$productCartList',
          as: 'item',
          cond: {
            $regexMatch: {
              input: '$$item.listName',
              regex: new RegExp(`^${slug}$`, 'i'),
            },
          },
        },
      };
    }

    const favorite = await FavoriteModel.findOne(
      matchQuery,
      projectQuery
    ).populate('productCartList.productDetails');
    return favorite;
  }
  async addToFavorite(
    token: string,
    productId: string,
    price: number
  ): Promise<Favorite> {
    // Verify the token and extract the user ID
    const verifyToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const userId = verifyToken.userId;

    // Find the user's favorite document or create a new one
    let favorite = await FavoriteModel.findOneAndUpdate(
      { userId },
      {},
      { new: true, upsert: true }
    );

    // Check if the product exists in the favorite list
    const productExists = favorite.productCartList.some(
      (item: any) => item.productId.toString() === productId
    );

    if (productExists) {
      // If the product exists, call removeFavorite directly
      favorite = await this.removeFavorite(token, productId);
    } else {
      // Otherwise, add the product
      favorite.productCartList.push({ productId, price, quantity: 1 });

      // Recalculate the total price
      favorite.totalPrice = favorite.productCartList.reduce(
        (sum: number, item: { price: number; quantity: number }) =>
          sum + item.price * item.quantity,
        0
      );

      // Save the updated favorite document
      await favorite.save();
    }

    return favorite;
  }
}
