import { IAddress } from '../../domain/entities/Address';
import { AddressRepository } from '../../domain/interfaces/AddressRepository';

export class setDefaultAddress {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(userId: string, addressId: string): Promise<IAddress | null> {
    return await this.addressRepository.setDefaultAddress(userId, addressId);
  }
}
