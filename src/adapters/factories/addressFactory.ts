import { updateAddress } from './../../use-cases/address/updateAddress';
import { createAddress } from './../../use-cases/address/createAddress';
import { AddressRepositoryImpl } from '../../infrastructure/database/AddressRepositoryImpl';
import { AddressController } from '../controllers/AddressController';
import { findByUserIdAddress } from '../../use-cases/address/findByUserIdAddress';
import { deleteAddress } from '../../use-cases/address/deleteAddress';
import { setDefaultAddress } from '../../use-cases/address/setDefaultAddress';
import { findByIdAddress } from '../../use-cases/address/findByIdAddress';

export const makeAddressController = (): AddressController => {
  const addressRepository = new AddressRepositoryImpl();
  const createAddressUseCase = new createAddress(addressRepository);
  const findByIdAddressUseCase = new findByIdAddress(addressRepository);
  const findByUserIdAddressUseCase = new findByUserIdAddress(addressRepository);
  const updateAddressUseCase = new updateAddress(addressRepository);
  const deleteAddressUseCase = new deleteAddress(addressRepository);
  const setDefaultAddressUseCase = new setDefaultAddress(addressRepository);

  return new AddressController(
    createAddressUseCase,
    findByIdAddressUseCase,
    findByUserIdAddressUseCase,
    updateAddressUseCase,
    deleteAddressUseCase,
    setDefaultAddressUseCase
  );
};
