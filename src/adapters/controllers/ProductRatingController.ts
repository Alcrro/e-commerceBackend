import { DeleteRating } from './../../use-cases/productRating/deleteRating';
import { GetRatingByProductId } from './../../use-cases/productRating/getRatingByProductId';
import { Request, Response } from 'express';
import { CreateRating } from '../../use-cases/productRating/createRating';
import { Rating } from '../../domain/entities/Rating';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../infrastructure/utils/responseUtils';
import mongoose from 'mongoose';

export class ProductRatingController {
  constructor(
    private readonly createRatingUseCase: CreateRating,
    private readonly GetRatingByProductId: GetRatingByProductId,
    private readonly deleteRating: DeleteRating
  ) {}

  CreateRating = async (req: Request<{}, {}, Rating>, res: Response) => {
    const rating = await this.createRatingUseCase.execute(req.body);

    sendSuccessResponse(res, rating, 'Rating created successfully', 201);
  };

  GetRatingByProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return sendErrorResponse(res, 'Invalid product ID', 404);
    }

    const rating = await this.GetRatingByProductId.execute(productId);

    sendSuccessResponse(res, rating, 'Rating find successfully');
  };

  RemoveRating = async (req: Request, res: Response) => {
    const { ratingId } = req.params;
    const rating = await this.deleteRating.execute(ratingId);

    sendSuccessResponse(res, rating, 'Rating find successfully');
  };
}
