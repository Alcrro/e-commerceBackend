import mongoose from 'mongoose';
import { BaseProductModel } from './BaseProductModel';

// TV Model
const TVSchema = new mongoose.Schema(
  {
    screenSize: { type: Number, required: true },
    resolution: { type: String, required: true }, // e.g., 4K, 1080p
    smartFeatures: { type: Boolean, default: false },
    panelType: { type: String, required: false }, // e.g., OLED, QLED
  },
  { timestamps: true }
);
export const TVModel = BaseProductModel.discriminator('TV', TVSchema);
