import { Order } from '../../domain/entities/Order';
import { OrderRepository } from '../../domain/interfaces/OrderRepository';

export class Create {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(order: Order): Promise<Order> {
    return await this.orderRepository.create(order);
  }
}
