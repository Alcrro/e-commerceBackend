import mongoose from 'mongoose';
import { BaseProductModel } from './BaseProductModel';

// PC Model
const PCSchema = new mongoose.Schema(
  {
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    gpu: { type: String, required: false },
    operatingSystem: { type: String, required: false },
  },
  { timestamps: true }
);
export const PCModel = BaseProductModel.discriminator('PC', PCSchema);
