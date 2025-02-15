import { IAddress } from '../../domain/entities/Address';
import { AddressRepository } from '../../domain/interfaces/AddressRepository';

export class createAddress {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(address: IAddress): Promise<IAddress> {
    return await this.addressRepository.create(address);
  }
}
