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
  '/get-products',
  asyncHandler(productController.GetAllProduct)
);
