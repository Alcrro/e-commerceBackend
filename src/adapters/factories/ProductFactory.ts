import { ProductRepositoryImpl } from '../../infrastructure/database/ProductRepositoryImpl';
import { CreateProduct } from '../../use-cases/product/createProduct';
import { GetAllProducts } from '../../use-cases/product/GetAllProducts';
import { ProductController } from '../controllers/ProductController';

export const makeProductController = (): ProductController => {
  const productRepository = new ProductRepositoryImpl();
  const createProductUseCase = new CreateProduct(productRepository);
  const getAllProductUseCase = new GetAllProducts(productRepository);

  return new ProductController(createProductUseCase, getAllProductUseCase);
};
