import { Product } from '../../domain/entities/product/BaseProduct';
import { ProductRepository } from '../../domain/interfaces/ProductRepository';

export class GetProductById {
  constructor(private readonly getProductById: ProductRepository) {}
  async execute(productId: string): Promise<Product | null> {
    return await this.getProductById.findById(productId);
  }
}
