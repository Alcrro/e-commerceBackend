import { Cart } from '../entities/Cart';

export interface CartRepository {
  getCart(token: string): Promise<Cart | null>;
  saveCart(token: string, productId: string, number: number): Promise<Cart>;
  deleteProduct(token: string, productId: string): Promise<Cart | null>;
  clearCart(): Promise<Cart[]>;
}
