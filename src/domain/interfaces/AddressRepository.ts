import { IAddress } from '../entities/Address';

export interface AddressRepository {
  create(address: IAddress): Promise<IAddress>;
  findById(id: string): Promise<IAddress | null>;
  findByUserId(userId: string): Promise<IAddress[] | null>;
  update(id: string, address: Partial<IAddress>): Promise<IAddress | null>;
  delete(id: string): Promise<boolean>;
  setDefaultAddress(
    userId: string,
    addressId: string
  ): Promise<IAddress | null>;
}
