import { Product } from '../../domain/entities/product/BaseProduct';
import { ProductRepository } from '../../domain/interfaces/ProductRepository';
import { ProductDocument } from '../../infrastructure/model/product/BaseProductModel';

export class CreateProduct {
  constructor(private readonly createProduct: ProductRepository) {}

  async execute(product: Product): Promise<ProductDocument> {
    return await this.createProduct.create(product);
  }
}
