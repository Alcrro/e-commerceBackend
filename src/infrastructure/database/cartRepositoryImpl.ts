import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../../config';
import { Cart } from '../../domain/entities/Cart';
import CartModel from '../model/CartModel';
import { CartRepository } from './../../domain/interfaces/CartRepository';

export class CartRepositoryImpl implements CartRepository {
  async deleteProduct(token: string, productId: string): Promise<Cart | null> {
    try {
      // Verify the token and extract the user ID
      const verifyToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
      const userId = verifyToken.userId;

      // Delete the product from the user's cart
      const deletedProduct = await CartModel.findOneAndUpdate(
        { userId },
        { $pull: { productCartList: { productId } } }, // Remove the specific product
        { new: true } // Return the updated cart
      );

      return deletedProduct;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }
  async getCart(token: string): Promise<Cart | null> {
    try {
      // Verify the token and extract the user ID
      const verifyToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
      const userId = verifyToken.userId;

      const cart = await CartModel.findOne({ userId }).populate(
        'productCartList.productDetails'
      );

      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async saveCart(
    token: string,
    productId: string,
    price: number
  ): Promise<Cart> {
    // Verify the token and extract the user ID
    const verifyToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const userId = verifyToken.userId;

    // Find the user's favorite document or create a new one
    const cart = await CartModel.findOneAndUpdate(
      { userId },
      {},
      { new: true, upsert: true }
    );

    // Check if the product exists in the favorite list
    const product = cart.productCartList.find(
      (item: any) => item.productId.toString() === productId
    );

    if (product) {
      // Update the product's price and increment the quantity
      product.price = price * ((product.quantity || 1) + 1);
      product.quantity = (product.quantity || 1) + 1; // Increment quantity
    } else {
      // Add the new product to the list
      cart.productCartList.push({
        productId,
        price,
        quantity: 1,
      });
    }

    // Recalculate the total price
    cart.totalPrice = cart.productCartList.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    // Save the updated favorite document
    await cart.save();
    return cart;
  }

  async clearCart(): Promise<Cart[]> {
    try {
      const clCart = await CartModel.find();

      return clCart;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      console.log(error);
      throw new Error('An known error');
    }
  }
}
