import { Request, Response } from 'express';
import { HomeMetadata } from '../../../use-cases/metadata/home/home';
import { sendSuccessResponse } from '../../../infrastructure/utils/responseUtils';

export class HomeMetadataController {
  constructor(private readonly homeMetadataUseCase: HomeMetadata) {}

  GetHomeMetadata = async (req: Request, res: Response) => {
    const getHomeMetadata = await this.homeMetadataUseCase.execute();

    sendSuccessResponse(res, getHomeMetadata, 'Metadata loaded successfully');
  };
}
