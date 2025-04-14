import mongoose from 'mongoose';
import { BaseProductModel } from './BaseProductModel';

// Software Model
const SoftwareSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true }, // e.g., Windows, Mac, Linux
    licenseType: { type: String, required: true }, // e.g., one-time, subscription
    version: { type: String, required: false },
  },
  { timestamps: true }
);
export const SoftwareModel = BaseProductModel.discriminator(
  'Software',
  SoftwareSchema
);
