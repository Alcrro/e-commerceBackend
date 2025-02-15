import { Cart } from '../../domain/entities/Cart';
import { CartRepository } from '../../domain/interfaces/CartRepository';

export class SaveCart {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(token: string, userId: string, number: number): Promise<Cart> {
    return await this.cartRepository.saveCart(token, userId, number);
  }
}
