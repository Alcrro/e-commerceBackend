import { IAddress } from '../../domain/entities/Address';
import { AddressRepository } from '../../domain/interfaces/AddressRepository';

export class deleteAddress {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.addressRepository.delete(id);
  }
}
