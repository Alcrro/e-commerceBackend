export interface Rating {
  id?: string;
  userId?: string;
  productId?: string;
  rating: number;
  review: string;
  images?: string[];
  createAt?: Date;
  updateAt?: Date;
}
