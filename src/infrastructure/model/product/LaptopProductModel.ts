import mongoose from 'mongoose';
import { BaseProductModel } from './BaseProductModel';
import { Product } from '../../../domain/entities/product/BaseProduct';

interface LaptopProduct extends Product {
  processor: string;
  ram: string;
  storage: string;
  screenSize: number;
  batteryLife: string;
}
const LaptopSchema = new mongoose.Schema<LaptopProduct>({
  processor: { type: String, required: true },
  ram: { type: String, required: true },
  storage: { type: String, required: true },
  screenSize: { type: Number, required: true },
  batteryLife: { type: String, required: true },
});

const LaptopModel = BaseProductModel.discriminator('Laptop', LaptopSchema);
export default LaptopModel;
