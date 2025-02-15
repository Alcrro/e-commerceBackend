import { OrderRepositoryImpl } from '../../infrastructure/database/OrderRepositoryImpl';
import { Create } from '../../use-cases/order/Create';
import { FindById } from '../../use-cases/order/FindById';
import { FindByStatus } from '../../use-cases/order/FindByStatus';
import { FindByUserId } from '../../use-cases/order/FindByUserId';
import { UpdateStatus } from '../../use-cases/order/UpdateStatus';
import { OrderController } from '../controllers/OrderController';

export const makeOrderController = (): OrderController => {
  const orderRepository = new OrderRepositoryImpl();

  const createUseCase = new Create(orderRepository);
  const findByUserIdUseCase = new FindByUserId(orderRepository);
  const findByIdUseCase = new FindById(orderRepository);
  const findByStatusUseCase = new FindByStatus(orderRepository);
  const updateStatusUseCase = new UpdateStatus(orderRepository);

  return new OrderController(
    createUseCase,
    findByUserIdUseCase,
    findByIdUseCase,
    findByStatusUseCase,
    updateStatusUseCase
  );
};
