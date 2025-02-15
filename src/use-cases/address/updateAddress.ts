import { IAddress } from '../../domain/entities/Address';
import { AddressRepository } from '../../domain/interfaces/AddressRepository';

export class updateAddress {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(
    id: string,
    address: Partial<IAddress>
  ): Promise<IAddress | null> {
    return await this.addressRepository.update(id, address);
  }
}
