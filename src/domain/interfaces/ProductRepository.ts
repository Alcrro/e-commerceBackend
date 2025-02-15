import { ProductDocument } from '../../infrastructure/model/product/BaseProductModel';
import { Product } from '../entities/product/BaseProduct';

export interface ProductRepository {
  findById(id: string): Promise<ProductDocument | null>;
  findAll(): Promise<ProductDocument[]>;
  create(product: Product): Promise<ProductDocument>;
  update(
    id: string,
    product: Partial<Product>
  ): Promise<ProductDocument | null>;
  delete(id: string): Promise<boolean>;
  findByName(name: string): Promise<ProductDocument | null>; // Example of a specific method
}
