import mongoose from 'mongoose';
import { BaseProductModel } from './BaseProductModel';

// Photo Model
const PhotoSchema = new mongoose.Schema(
  {
    cameraType: { type: String, required: true }, // e.g., DSLR, mirrorless
    resolution: { type: Number, required: true }, // in megapixels
    lensCompatibility: { type: [String], required: false },
  },
  { timestamps: true }
);
const PhotoModel = BaseProductModel.discriminator('Photo', PhotoSchema);
