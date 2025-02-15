import { IAddress } from '../../domain/entities/Address';
import { AddressRepository } from '../../domain/interfaces/AddressRepository';

export class findByUserIdAddress {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(token: string): Promise<IAddress[] | null> {
    return await this.addressRepository.findByUserId(token);
  }
}
