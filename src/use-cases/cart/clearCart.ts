import { Cart } from '../../domain/entities/Cart';
import { CartRepository } from '../../domain/interfaces/CartRepository';

export class ClearCart {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(): Promise<Cart[]> {
    return await this.cartRepository.clearCart();
  }
}
