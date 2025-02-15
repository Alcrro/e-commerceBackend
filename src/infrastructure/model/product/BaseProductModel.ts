import mongoose from 'mongoose';
import {
  Product,
  ProductCategories,
} from '../../../domain/entities/product/BaseProduct';

interface ProductDocument extends Product {
  name: string; // Name of the product
  description: string; // Detailed description
  price: number; // Price of the product
  category: ProductCategories; // Category to which the product belongs
  stock: number; // Quantity available in stock
  images: string[]; // Optional array of image URLs
  thumbnail: string; // image URLs
  createdAt: Date; // Date when the product was added
  updatedAt: Date; // Date when the product details were last updated
}
const BaseProductSchema = new mongoose.Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    images: { type: [String], required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true, discriminatorKey: 'productType' }
);

const BaseProductModel = mongoose.model('Product', BaseProductSchema);

export { BaseProductModel, ProductDocument };
