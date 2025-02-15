import { IAddress } from '../../domain/entities/Address';
import { AddressRepository } from '../../domain/interfaces/AddressRepository';

export class findByIdAddress {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(id: string): Promise<IAddress | null> {
    return await this.addressRepository.findById(id);
  }
}
