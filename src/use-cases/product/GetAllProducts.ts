import { Product } from '../../domain/entities/product/BaseProduct';
import { ProductRepository } from '../../domain/interfaces/ProductRepository';

export class GetAllProducts {
  constructor(private readonly getAllProducts: ProductRepository) {}

  async execute(
    category: string | string[],
    filters: Record<string, string | string[]>,
    page: number,
    limit: number
  ): Promise<Product[]> {
    return await this.getAllProducts.findAll(category, filters, page, limit);
  }
}
