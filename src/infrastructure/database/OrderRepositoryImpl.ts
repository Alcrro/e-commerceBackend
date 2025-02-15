import { config } from '../../../config';
import { Order } from '../../domain/entities/Order';
import { OrderRepository } from '../../domain/interfaces/OrderRepository';
import OrderModel from '../model/OrderModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class OrderRepositoryImpl implements OrderRepository {
  async create(order: Order): Promise<Order> {
    const createdOrder = new OrderModel(order);
    return await createdOrder.save();
  }

  async findById(orderId: string): Promise<Order | null> {
    return await OrderModel.findById(orderId).lean();
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const verifyToken = jwt.verify(userId, config.jwtSecret) as JwtPayload;
    const userIdVerified = verifyToken.userId;

    return await OrderModel.find({ userId: userIdVerified }).lean();
  }
  async findByStatus(
    userId: string,
    status: string,
    createdAt: string
  ): Promise<Order[]> {
    // Verify token (assuming userId is actually a JWT token, which it shouldn't be)
    const verifyToken = jwt.verify(userId, config.jwtSecret) as {
      userId: string;
    };
    const userIdVerified = verifyToken.userId;

    // Build filter dynamically
    let filter: any = { userId: userIdVerified };

    let dateParse: Date | null = null; // Initialize with null
    let today = new Date();

    if (createdAt === 'last-3-months') {
      dateParse = new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate()
      );
    } else if (createdAt === 'last-6-months') {
      dateParse = new Date(
        today.getFullYear(),
        today.getMonth() - 6,
        today.getDate()
      );
    } else if (createdAt === 'last-year') {
      dateParse = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate()
      );
    }

    if (status) {
      filter.status = status;
    }

    if (createdAt) {
      filter.createdAt = { $gte: dateParse }; // Filters from the given date
    }

    return await OrderModel.find(filter).lean();
  }

  async updateStatus(
    orderId: string,
    status: Order['status']
  ): Promise<Order | null> {
    return await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).lean();
  }

  async delete(orderId: string): Promise<boolean> {
    const result = await OrderModel.findByIdAndDelete(orderId);
    return result !== null;
  }
}
