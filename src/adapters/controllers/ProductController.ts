import { GetFilterOptions } from './../../use-cases/product/GetFilterOptions';
import { Request, Response } from 'express';
import { Product } from '../../domain/entities/product/BaseProduct';
import { sendSuccessResponse } from '../../infrastructure/utils/responseUtils';
import { CreateProduct } from '../../use-cases/product/createProduct';
import { GetAllProducts } from '../../use-cases/product/GetAllProducts';
import { GetProductById } from '../../use-cases/product/getProductById';

export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProduct,
    private readonly getAllProductUseCase: GetAllProducts,
    private readonly getFilterOptionsUseCase: GetFilterOptions,
    private readonly getProductByIdUseCase: GetProductById
  ) {}

  CreateProduct = async (req: Request<{}, {}, Product>, res: Response) => {
    const createProduct = await this.createProductUseCase.execute(req.body);
    sendSuccessResponse(res, createProduct, 'Created successfully');
  };

  GetProductId = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(req.params);

    const product = await this.getProductByIdUseCase.execute(id);
    sendSuccessResponse(res, product, 'Product loaded successfully!');
  };

  GetAllProduct = async (req: Request, res: Response) => {
    const { category } = req.params;

    const pageNumber = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.limit as string, 10) || 10;

    // Parse category (supports multiple categories: "phone-laptop-tv")
    const parsedCategory = category && (category.split('-') as string[]);
    const filters: Record<string, string | string[]> = {};

    Object.entries(req.query).forEach(([key, value]) => {
      if (key !== 'page' && key !== 'limit') {
        if (typeof value === 'string') {
          filters[key] = value; // ✅ Single string value
        } else if (Array.isArray(value)) {
          filters[key] = value.map(String); // ✅ Convert ParsedQs[] to string[]
        }
      }
    });

    // console.log(parsedCategory);
    // console.log(req.query);
    // console.log(filters);
    console.log(req.params);

    const result = await this.getAllProductUseCase.execute(
      parsedCategory,
      filters,
      pageNumber,
      pageSize
    ); // Always an object

    sendSuccessResponse(res, result, 'Load successfully', 200, {
      count: result.length,
    });
  };

  GetFilteredProducts = async (req: Request, res: Response) => {};
}
