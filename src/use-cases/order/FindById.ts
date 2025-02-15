import { Order } from '../../domain/entities/Order';
import { OrderRepository } from '../../domain/interfaces/OrderRepository';

export class FindById {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<Order | null> {
    return await this.orderRepository.findById(orderId);
  }
}
