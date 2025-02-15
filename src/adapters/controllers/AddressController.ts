import { findByUserIdAddress } from './../../use-cases/address/findByUserIdAddress';
import { Request, Response } from 'express';
import { createAddress } from '../../use-cases/address/createAddress';
import { sendSuccessResponse } from '../../infrastructure/utils/responseUtils';
import { updateAddress } from '../../use-cases/address/updateAddress';
import { deleteAddress } from '../../use-cases/address/deleteAddress';
import { setDefaultAddress } from '../../use-cases/address/setDefaultAddress';
import { extractToken } from '../../infrastructure/utils/tokenUtils';
import { findByIdAddress } from '../../use-cases/address/findByIdAddress';

export class AddressController {
  constructor(
    private readonly createAddressUseCase: createAddress,
    private readonly findByIdAddressUseCase: findByIdAddress,
    private readonly findByUserIdAddressUseCase: findByUserIdAddress,
    private readonly updateAddressUseCase: updateAddress,
    private readonly deleteAddressUseCase: deleteAddress,
    private readonly setDefaultAddressUseCase: setDefaultAddress
  ) {}

  CreateAddress = async (req: Request, res: Response) => {
    const createAddress = await this.createAddressUseCase.execute(req.body);

    sendSuccessResponse(
      res,
      createAddress,
      'Address is successfully created',
      201
    );
  };
  GetAddress = async (req: Request, res: Response) => {
    const authToken = req.headers;
    const token = extractToken(authToken);
    if (!token) throw new Error('TOken is invalid!');

    const getAddress = await this.findByUserIdAddressUseCase.execute(token);

    sendSuccessResponse(res, getAddress, 'Address is founded', 201);
  };
  GetByIdAddress = async (req: Request, res: Response) => {
    const id = req.params.id;

    const getAddress = await this.findByIdAddressUseCase.execute(id);

    sendSuccessResponse(res, getAddress, 'Address is founded', 201);
  };

  UpdateAddress = async (req: Request, res: Response) => {
    const id = req.params.id;

    const updateAddress = await this.updateAddressUseCase.execute(id, req.body);

    sendSuccessResponse(res, updateAddress, 'Address is updated!', 201);
  };
  SetDefaultAddress = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const setDefaultAddress = await this.setDefaultAddressUseCase.execute(
      userId,
      req.body
    );
    // console.log(setDefaultAddress);

    sendSuccessResponse(res, setDefaultAddress, 'Address is updated!', 201);
  };
}
