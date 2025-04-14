import { GetFilterOptions } from './../../use-cases/product/GetFilterOptions';
import { ProductRepositoryImpl } from '../../infrastructure/database/ProductRepositoryImpl';
import { CreateProduct } from '../../use-cases/product/createProduct';
import { GetAllProducts } from '../../use-cases/product/GetAllProducts';
import { ProductController } from '../controllers/ProductController';
import { GetProductById } from '../../use-cases/product/getProductById';

export const makeProductController = (): ProductController => {
  const productRepository = new ProductRepositoryImpl();
  const createProductUseCase = new CreateProduct(productRepository);
  const getAllProductUseCase = new GetAllProducts(productRepository);
  const getFilterOptionsUseCase = new GetFilterOptions(productRepository);
  const getProductByIdUseCase = new GetProductById(productRepository);

  return new ProductController(
    createProductUseCase,
    getAllProductUseCase,
    getFilterOptionsUseCase,
    getProductByIdUseCase
  );
};
