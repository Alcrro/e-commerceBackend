export interface Delivery {
  id: string;
  userId: string;
  addressId: string;
  price: number;
  estimatedTime: Date;
  status: 'pending' | 'shipped' | 'delivered' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}
