import { Order } from '../entities/Order';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(orderId: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
  updateStatus(orderId: string, status: Order['status']): Promise<Order | null>;
  findByStatus(
    userId: string,
    status: string,
    createdAt: string
  ): Promise<Order[]>;
  delete(orderId: string): Promise<boolean>;
}
