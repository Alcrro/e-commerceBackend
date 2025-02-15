import { Order } from '../../domain/entities/Order';
import { OrderRepository } from '../../domain/interfaces/OrderRepository';

export class FindByUserId {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(userId: string): Promise<Order[]> {
    return await this.orderRepository.findByUserId(userId);
  }
}
