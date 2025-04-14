import { Router } from 'express';
import { makeProductController } from '../../adapters/factories/ProductFactory';
import { asyncHandler } from '../middlewares/asyncHandler';

export const productRouter = Router();
const productController = makeProductController();

productRouter.post(
  '/create-product',
  asyncHandler(productController.CreateProduct)
);

productRouter.get(
  '/get-products/:category?',
  asyncHandler(productController.GetAllProduct)
);
productRouter.get(
  '/get-product/:id',
  asyncHandler(productController.GetProductId)
);
