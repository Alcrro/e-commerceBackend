import { BaseProductModel } from '../../infrastructure/model/product/BaseProductModel';
import { ProductRepository } from './../../domain/interfaces/ProductRepository';
export class GetFilterOptions {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    category: string,
    filters: Record<string, any> | {},
    page: number,
    limit: number
  ) {
    const products = await this.productRepository.findAll(
      category,
      filters,
      page,
      limit
    );

    return { products };
  }
}
