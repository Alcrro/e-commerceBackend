import { Product } from '../../domain/entities/product/BaseProduct';
import { ProductRepository } from '../../domain/interfaces/ProductRepository';

export class GetAllProducts {
  constructor(private readonly getAllProducts: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.getAllProducts.findAll();
  }
}
