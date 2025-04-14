import { Delivery } from '../entities/Delivery';

export interface IDeliveryRepository {
  createDelivery(delivery: Delivery): Promise<Delivery>;
  getDeliveryById(id: string): Promise<Delivery | null>;
  getDeliveriesByUser(userId: string): Promise<Delivery[]>;
  updateDeliveryStatus(
    id: string,
    status: 'pending' | 'shipped' | 'delivered' | 'canceled'
  ): Promise<boolean>;
}
