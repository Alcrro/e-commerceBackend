import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { makeCartController } from '../../adapters/factories/cartFactory';

const cartRouter = Router();
const cartController = makeCartController();

cartRouter.post('/create-cart', asyncHandler(cartController.SaveCart));
cartRouter.get('/get-cart', asyncHandler(cartController.GetCart));
cartRouter.post('/clear-cart', asyncHandler(cartController.ClearCart));
cartRouter.delete(
  '/delete-product-cart',
  asyncHandler(cartController.DeleteCart)
);

export default cartRouter;
