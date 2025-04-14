import { makeAddressController } from '../../adapters/factories/addressFactory';
import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';

export const addressRoute = Router();

const addressController = makeAddressController();
addressRoute.post(
  '/create-address',
  asyncHandler(addressController.CreateAddress)
);
addressRoute.get('/get-address', asyncHandler(addressController.GetAddress));
addressRoute.get(
  '/get-address/:id',
  asyncHandler(addressController.GetByIdAddress)
);
addressRoute.patch(
  '/update-address/:id',
  asyncHandler(addressController.UpdateAddress)
);
addressRoute.patch(
  '/update-default-address/:id',
  asyncHandler(addressController.SetDefaultAddress)
);
