import { Cart } from '../../domain/entities/Cart';
import { CartRepository } from '../../domain/interfaces/CartRepository';

export class deleteCart {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(token: string, productId: string): Promise<Cart | null> {
    return await this.cartRepository.deleteProduct(token, productId);
  }
}
