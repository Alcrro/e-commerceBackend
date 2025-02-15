import { Request, Response } from 'express';
import { SaveCart } from '../../use-cases/cart/saveCart';
import { GetCart } from '../../use-cases/cart/getCart';
import { ClearCart } from '../../use-cases/cart/clearCart';
import { extractToken } from '../../infrastructure/utils/tokenUtils';
import { sendSuccessResponse } from '../../infrastructure/utils/responseUtils';
import { deleteCart } from '../../use-cases/cart/deleteCart';

export class CartController {
  constructor(
    private readonly createCartUseCase: SaveCart,
    private readonly getCart: GetCart,
    private readonly clearCart: ClearCart,
    private readonly deleteCart: deleteCart
  ) {}

  SaveCart = async (req: Request, res: Response) => {
    const token = extractToken(req.headers);

    if (!token) throw new Error('TOken is invalid');

    const { productId, price } = req.body;
    const cart = await this.createCartUseCase.execute(token, productId, price);
    sendSuccessResponse(res, cart, 'Loading successfully', 201);
  };

  GetCart = async (req: Request, res: Response) => {
    const token = extractToken(req.headers);

    if (!token) throw new Error('TOken is invalid');

    const cart = await this.getCart.execute(token);

    sendSuccessResponse(res, cart, 'Cart successfully loaded');
  };

  ClearCart = async (req: Request, res: Response) => {
    const cart = await this.clearCart.execute();

    sendSuccessResponse(res, cart, 'Successfully cleared');
  };
  DeleteCart = async (req: Request, res: Response) => {
    const token = extractToken(req.headers);

    if (!token) throw new Error('TOken is invalid');

    const { productId } = req.body;

    const cart = await this.deleteCart.execute(token, productId);

    sendSuccessResponse(res, cart, 'Successfully deleted');
  };
}
