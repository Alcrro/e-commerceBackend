import mongoose from 'mongoose';
import { BaseProductModel } from './BaseProductModel';
import { Product } from '../../../domain/entities/product/BaseProduct';

interface PhoneProduct extends Product {
  brand: string;
  model: string;
  operatingSystem: 'Android' | 'iOS' | 'HarmonyOS' | 'Others';
  processor: string | 'Unknown';
  ram: '2GB' | '4GB' | '6GB' | '8GB' | '12GB' | '16GB' | 'Unknown';
  storageOptions: ('64GB' | '128GB' | '256GB' | '512GB' | '1TB')[];
  colorOptions: (
    | 'Black'
    | 'White'
    | 'Blue'
    | 'Red'
    | 'Gold'
    | 'Silver'
    | string
  )[];
  screenSize: number | string;
  batteryCapacity: number | 'Not Specified';
  cameraSpecs: {
    front: string;
    rear: string[];
  };
  connectivity: (
    | '2G'
    | '3G'
    | '4G'
    | '5G'
    | 'Bluetooth 5.0'
    | 'Wi-Fi 6'
    | 'NFC'
    | string
  )[];
  weight: number | 'Unknown';
  dimensions: {
    height: number | 'Unknown';
    width: number | 'Unknown';
    depth: number | 'Unknown';
  };
  warranty: string | 'No Warranty';
}

const PhoneSchema = new mongoose.Schema<PhoneProduct>({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  operatingSystem: {
    type: String,
    enum: ['Android', 'iOS', 'HarmonyOS', 'Others'],
    required: true,
  },
  processor: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        // Access the operatingSystem field
        const operatingSystem = (this as any).operatingSystem;

        // Define valid processors for each operating system
        const validProcessors: Record<string, string[]> = {
          iOS: ['Apple A14 Bionic', 'Apple A15 Bionic', 'Apple A16 Bionic'],
          Android: [
            'Snapdragon 8 Gen 2',
            'Exynos 2200',
            'MediaTek Dimensity 9200',
          ],
          HarmonyOS: ['Kirin 9000', 'Kirin 990'],
          Others: ['Unknown'],
        };

        // Ensure the processor matches the valid processors for the given OS
        return validProcessors[operatingSystem]?.includes(value);
      },
      message: (props) =>
        `Processor "${props.value}" is not valid for the operating system "${
          (props as any).instance.operatingSystem
        }".`,
    },
  },
  ram: {
    type: String,
    enum: ['2GB', '4GB', '6GB', '8GB', '12GB', '16GB', 'Unknown'],
    default: 'Unknown',
  },
  storageOptions: { type: [String], required: true },
  colorOptions: { type: [String], default: [] },
  screenSize: { type: mongoose.Schema.Types.Mixed, required: true },
  batteryCapacity: {
    type: mongoose.Schema.Types.Mixed,
    default: 'Not Specified',
  },
  cameraSpecs: {
    front: { type: String, required: true },
    rear: { type: [String], required: true },
  },
  connectivity: { type: [String], default: [] },
  weight: { type: mongoose.Schema.Types.Mixed, default: 'Unknown' },
  dimensions: {
    height: { type: mongoose.Schema.Types.Mixed, default: 'Unknown' },
    width: { type: mongoose.Schema.Types.Mixed, default: 'Unknown' },
    depth: { type: mongoose.Schema.Types.Mixed, default: 'Unknown' },
  },
  warranty: { type: String, default: 'No Warranty' },
});

const PhoneModel = BaseProductModel.discriminator('Phone', PhoneSchema);
export default PhoneModel;
