import { DecreaseQuantityAndPrice } from './../../use-cases/favorite/DecreaseQuantityAndPrice';
import { Request, Response } from 'express';
import { AddToFavorite } from '../../use-cases/favorite/AddToFavorite';
import { RemoveFavorite } from '../../use-cases/favorite/RemoveFavorite';
import { GetFavorite } from '../../use-cases/favorite/GetFavorite';
import { sendSuccessResponse } from '../../infrastructure/utils/responseUtils';
import { extractToken } from '../../infrastructure/utils/tokenUtils';
import { CreateFavoriteList } from '../../use-cases/favorite/CreateFavoriteList';

export class FavoriteController {
  constructor(
    private readonly addFavoriteUseCase: AddToFavorite,
    private readonly removeFavoriteUseCase: RemoveFavorite,
    private readonly getFavoriteUseCase: GetFavorite,
    private readonly decreaseQAndPFavoriteUseCase: DecreaseQuantityAndPrice,
    private readonly createFavoriteList: CreateFavoriteList
  ) {}

  AddToFavorite = async (req: Request, res: Response) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers;

    const token = extractToken(authHeader);
    if (!token) throw new Error('Token is Invalid');

    // Extract the product ID from the request body
    const { productId, price } = req.body;

    if (!productId) {
      res.status(400).json({ message: 'Product ID is required' });
    }

    // Call the favorite service to add the product
    const updatedFavorite = await this.addFavoriteUseCase.execute(
      token,
      productId,
      price
    );

    sendSuccessResponse(res, updatedFavorite, 'Loaded successfully');
  };

  GetFavorite = async (req: Request, res: Response) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers;

    // Extract the token part after "Bearer "
    const token = extractToken(authHeader);
    if (!token) throw new Error('Token is Invalid');

    const { slug } = req.params;

    const getFavorite = await this.getFavoriteUseCase.execute(token, slug);

    sendSuccessResponse(res, getFavorite, 'Get Loaded product');
  };

  RemoveFavorite = async (req: Request, res: Response) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers;
    const { productId } = req.body;
    // Extract the token part after "Bearer "
    const token = extractToken(authHeader);
    if (!token) throw new Error('Token is Invalid');

    const getFavorite = await this.removeFavoriteUseCase.execute(
      token,
      productId
    );
    // Respond with the updated favorite document
    sendSuccessResponse(res, getFavorite, 'loaded Successfully');
  };

  DecreaseQAndP = async (req: Request, res: Response) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers;
    const { productId } = req.body;
    // Extract the token part after "Bearer "
    const token = extractToken(authHeader);
    if (!token) throw new Error('Token is Invalid');

    const decreaseQAndPrice = await this.decreaseQAndPFavoriteUseCase.execute(
      token,
      productId
    );
    // Respond with the updated favorite document
    sendSuccessResponse(res, decreaseQAndPrice, 'Favorite is Updated');
  };
  CreateFavoriteList = async (req: Request, res: Response) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers;
    const { name } = req.body;
    // Extract the token part after "Bearer "
    const token = extractToken(authHeader);
    if (!token) throw new Error('Token is Invalid');

    const list = await this.createFavoriteList.execute(token, name);
    // Respond with the updated favorite document
    sendSuccessResponse(res, list, 'Favorite is Updated');
  };
}
