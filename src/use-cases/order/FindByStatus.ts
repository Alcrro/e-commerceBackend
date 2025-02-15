import { Order } from '../../domain/entities/Order';
import { OrderRepository } from '../../domain/interfaces/OrderRepository';

export class FindByStatus {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    userId: string,
    status: string,
    createdAt: string
  ): Promise<Order[]> {
    return await this.orderRepository.findByStatus(userId, status, createdAt);
  }
}
