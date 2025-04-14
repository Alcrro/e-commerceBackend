import mongoose from 'mongoose';
import { BaseProductModel } from './BaseProductModel';

// Peripherals Model
const PeripheralsSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // e.g., keyboard, mouse, monitor
    connectivity: { type: String, required: true }, // e.g., wired, wireless
    compatibility: { type: [String], required: false }, // Compatible OS or devices
  },
  { timestamps: true }
);
export const PeripheralsModel = BaseProductModel.discriminator(
  'Peripherals',
  PeripheralsSchema
);
