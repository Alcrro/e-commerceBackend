import mongoose, { Schema, Document } from 'mongoose';
import { IAddress } from '../../domain/entities/Address';

export interface IAddressDocument extends IAddress {
  userId: Schema.Types.ObjectId;
}

const AddressSchema = new Schema<IAddressDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AddressModel = mongoose.model<IAddressDocument>(
  'Address',
  AddressSchema
);
