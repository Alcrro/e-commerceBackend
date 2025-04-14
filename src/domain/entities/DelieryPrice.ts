export interface DeliveryPrice {
  id: string;
  addressId: string;
  basePrice: number;
  distanceFee: number;
  totalPrice: number;
  estimatedTime: number; // in minutes
}
