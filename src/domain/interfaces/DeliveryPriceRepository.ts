import { DeliveryPrice } from '../entities/DelieryPrice';

export interface DeliveryPriceRepository {
  calculatePriceByAddress(addressId: string): Promise<DeliveryPrice>;
  estimateDelivery(
    productLocation: { lat: number; lng: number },
    customerAddress: { lat: number; lng: number }
  ): Promise<DeliveryPrice>;
}
