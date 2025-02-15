export interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategories;
  isActive: boolean;
  images: string[];
  createdAt: Date; // Date when the product was added
  updatedAt: Date; // Date when the product details were last updated
}

export type ProductCategories = 'phone' | 'laptop';
