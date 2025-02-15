import { asyncHandler } from './../../middlewares/asyncHandler';
import { Router } from 'express';
import { HomeMetadataController } from '../../../adapters/controllers/metadata/HomeMetadataController';
import { HomeMetadata } from '../../../use-cases/metadata/home/home';
import { HomeRepositoryImpl } from '../../database/metadataRepositoryImpl/HomeRepositoryImpl';

export const homeMetadataRouter = Router();
const homeMetadataRepository = new HomeRepositoryImpl();
const homeMetadataUseCase = new HomeMetadata(homeMetadataRepository);
const homeMetadataController = new HomeMetadataController(homeMetadataUseCase);

homeMetadataRouter.get(
  '/get-home',
  asyncHandler(homeMetadataController.GetHomeMetadata)
);
