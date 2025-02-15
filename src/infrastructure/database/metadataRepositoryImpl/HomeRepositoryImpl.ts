import { IMetadata } from '../../../domain/entities/metadata/Home';
import { HomeMetadataRepository } from '../../../domain/interfaces/metadata/HomeMetadataRepsitory';
import HomeMetadataModel from '../../model/metadata/HomeMetadataModel';

export class HomeRepositoryImpl implements HomeMetadataRepository {
  async get(): Promise<IMetadata | null> {
    const homeMetadata = await HomeMetadataModel.findOne({});

    return homeMetadata;
  }
}
