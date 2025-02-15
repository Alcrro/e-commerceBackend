import { Cart } from '../../domain/entities/Cart';
import { CartRepository } from '../../domain/interfaces/CartRepository';

export class GetCart {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(token: string): Promise<Cart | null> {
    return await this.cartRepository.getCart(token);
  }
}
