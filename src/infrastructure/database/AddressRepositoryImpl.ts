import jwt, { JwtPayload } from 'jsonwebtoken';

import { IAddress } from '../../domain/entities/Address';
import { AddressRepository } from '../../domain/interfaces/AddressRepository';
import { AddressModel } from '../model/AddressModel';
import { config } from '../../../config';

export class AddressRepositoryImpl implements AddressRepository {
  async create(address: IAddress): Promise<IAddress> {
    const newAddress = new AddressModel(address);
    return await newAddress.save();
  }

  async findById(id: string): Promise<IAddress | null> {
    return await AddressModel.findById(id);
  }

  async findByUserId(token: string): Promise<IAddress[] | null> {
    // Verify the token and extract the user ID
    const verifyToken = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const userId = verifyToken.userId;

    return await AddressModel.find({ userId });
  }

  async update(
    id: string,
    address: Partial<IAddress>
  ): Promise<IAddress | null> {
    return await AddressModel.findByIdAndUpdate(id, address, {
      new: true,
    }).lean();
  }

  async delete(id: string): Promise<boolean> {
    const result = await AddressModel.findByIdAndDelete(id);
    return result !== null;
  }

  async setDefaultAddress(
    userId: string,
    addressId: string
  ): Promise<IAddress | null> {
    // Unset previous default address only if it exists
    const previousDefault = await AddressModel.findOne({
      userId,
      isDefault: true,
    });

    if (previousDefault) {
      // Only unset if a default address is found
      await AddressModel.updateMany(
        { userId, isDefault: true },
        { isDefault: false }
      );
    }

    // Set new default address
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      addressId,
      { isDefault: true },
      { new: true }
    ).lean();

    return updatedAddress;
  }
}
