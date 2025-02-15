import { Request, Response } from 'express';
import { Product } from '../../domain/entities/product/BaseProduct';
import { sendSuccessResponse } from '../../infrastructure/utils/responseUtils';
import { CreateProduct } from '../../use-cases/product/createProduct';
import { GetAllProducts } from '../../use-cases/product/GetAllProducts';

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProduct,
    private readonly getAllProductUseCase: GetAllProducts
  ) {}

  CreateProduct = async (req: Request<{}, {}, Product>, res: Response) => {
    const createProduct = await this.createProductUseCase.execute(req.body);
    sendSuccessResponse(res, createProduct, 'Created successfully');
  };

  GetAllProduct = async (req: Request, res: Response) => {
    const getAllProducts = await this.getAllProductUseCase.execute();

    sendSuccessResponse(res, getAllProducts, 'Load successfully');
  };
}
