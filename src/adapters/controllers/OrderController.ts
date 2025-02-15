import { FindById } from './../../use-cases/order/FindById';
import { Request, Response } from 'express';
import { Create } from '../../use-cases/order/Create';
import { sendSuccessResponse } from '../../infrastructure/utils/responseUtils';
import { FindByUserId } from '../../use-cases/order/FindByUserId';
import { extractToken } from '../../infrastructure/utils/tokenUtils';
import { FindByStatus } from '../../use-cases/order/FindByStatus';
import { UpdateStatus } from '../../use-cases/order/UpdateStatus';

export class OrderController {
  constructor(
    private readonly createUseCase: Create,
    private readonly findByUserIdUseCase: FindByUserId,
    private readonly findByIdUseCase: FindById,
    private readonly findByStatusUseCase: FindByStatus,
    private readonly updateStatusUseCase: UpdateStatus
  ) {}

  Create = async (req: Request, res: Response) => {
    const order = await this.createUseCase.execute(req.body);

    sendSuccessResponse(res, order, 'Order created successfully');
  };
  FindById = async (req: Request, res: Response) => {
    const token = extractToken(req.headers);

    if (!token) throw new Error('Token is Invalid');

    const findOrder = await this.findByIdUseCase.execute(token);

    sendSuccessResponse(res, findOrder, 'Order created successfully');
  };
  FindByUserId = async (req: Request, res: Response) => {
    const token = extractToken(req.headers);

    if (!token) throw new Error('Token is Invalid');

    const findOrder = await this.findByUserIdUseCase.execute(token);

    sendSuccessResponse(res, findOrder, 'Order created successfully');
  };
  FindByStatus = async (req: Request, res: Response) => {
    const { status, createdAt } = req.params;

    const token = extractToken(req.headers);

    if (!token) throw new Error('Token is Invalid');

    const findOrder = await this.findByStatusUseCase.execute(
      token,
      status,
      createdAt
    );

    sendSuccessResponse(res, findOrder, 'Order created successfully');
  };
  UpdateStatus = async (req: Request, res: Response) => {
    const token = extractToken(req.headers);

    if (!token) throw new Error('Token is Invalid');

    const { orderId, status } = req.body;

    const findOrder = await this.updateStatusUseCase.execute(orderId, status);

    sendSuccessResponse(res, findOrder, 'Order created successfully');
  };
}
