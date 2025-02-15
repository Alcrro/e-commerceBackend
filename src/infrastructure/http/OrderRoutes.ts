import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { makeOrderController } from '../../adapters/factories/orderFactory';

export const orderRouter = Router();
const orderController = makeOrderController();
orderRouter.post('/create-order', asyncHandler(orderController.Create));
orderRouter.get('/get-byId-order', asyncHandler(orderController.FindById));
orderRouter.get(
  '/get-byUserId-order',
  asyncHandler(orderController.FindByUserId)
);
orderRouter.get(
  '/get-byStatus-order/:status/:createdAt',
  asyncHandler(orderController.FindByStatus)
);
orderRouter.patch(
  '/update-status-order',
  asyncHandler(orderController.UpdateStatus)
);
