import mongoose from 'mongoose';
import { BaseProductModel } from './BaseProductModel';

// Audio Model
const AudioSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // e.g., headphones, speakers
    wireless: { type: Boolean, default: false },
    batteryLife: { type: Number, required: false }, // in hours
  },
  { timestamps: true }
);
const AudioModel = BaseProductModel.discriminator('Audio', AudioSchema);
