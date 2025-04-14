import { Model } from 'mongoose';
import { Product } from '../../domain/entities/product/BaseProduct';
import { ProductRepository } from '../../domain/interfaces/ProductRepository';
import {
  BaseProductModel,
  ProductDocument,
} from '../model/product/BaseProductModel';
import LaptopProductModel from '../model/product/LaptopProductModel';
import PhoneProductModel from '../model/product/PhoneProductModel';
import { getProductsWithFiltersPipeline } from '../piplines/productPipeline';

export class ProductRepositoryImpl implements ProductRepository {
  private readonly modelMap: Record<string, Model<any>>;

  constructor() {
    // Register all models here with their corresponding types
    this.modelMap = {
      phone: PhoneProductModel,
      laptop: LaptopProductModel,
      default: BaseProductModel,
    };
  }
  async getFilterOptions(category: string) {
    const products = await BaseProductModel.find({ category }).lean();

    const filterOptions: Record<string, Set<any>> = {};

    products.forEach((product) => {
      for (const [key, value] of Object.entries(product.attributes)) {
        if (!filterOptions[key]) {
          filterOptions[key] = new Set();
        }

        if (Array.isArray(value)) {
          value.forEach((val) => filterOptions[key].add(val));
        } else {
          filterOptions[key].add(value);
        }
      }
    });

    return Object.fromEntries(
      Object.entries(filterOptions).map(([key, values]) => [
        key,
        Array.from(values),
      ])
    );
  }

  async update(
    id: string,
    product: Partial<Product>
  ): Promise<ProductDocument | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findByName(name: string): Promise<ProductDocument | null> {
    throw new Error('Method not implemented.');
  }

  async create(product: Product): Promise<ProductDocument> {
    try {
      const Model = this.modelMap[product.category] || this.modelMap.default;

      // Ensure the model matches the product type
      const createProduct = new Model(product);
      const createProductSaved = await createProduct.save();

      return createProductSaved;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<ProductDocument | null> {
    try {
      console.log(id);

      const product = await BaseProductModel.findById(id);
      return product;
    } catch (error) {
      console.error('Error finding product by ID:', error);
      return null;
    }
  }

  async findAll(
    category: string | string[],
    filters: Record<string, string | string[]>,
    page: number,
    limit: number
  ): Promise<ProductDocument[]> {
    try {
      const pipeline = getProductsWithFiltersPipeline(
        category,
        filters,
        page,
        limit
      );
      const result = await BaseProductModel.aggregate(pipeline);

      return result[0];
    } catch (error) {
      console.error('Error fetching all products:', error);
      return [];
    }
  }

  // Other CRUD methods (update, delete, etc.) can be similarly adjusted...
}
