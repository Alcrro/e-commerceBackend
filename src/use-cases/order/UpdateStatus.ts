import { Order } from './../../domain/entities/Order';
import { OrderRepository } from '../../domain/interfaces/OrderRepository';

export class UpdateStatus {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    orderId: string,
    status: Order['status']
  ): Promise<Order | null> {
    return await this.orderRepository.updateStatus(orderId, status);
  }
}
