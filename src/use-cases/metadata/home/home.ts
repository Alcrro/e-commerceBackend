import { IMetadata } from '../../../domain/entities/metadata/Home';
import { HomeMetadataRepository } from '../../../domain/interfaces/metadata/HomeMetadataRepsitory';

export class HomeMetadata {
  constructor(private readonly homeMetadata: HomeMetadataRepository) {}

  async execute(): Promise<IMetadata | null> {
    return await this.homeMetadata.get();
  }
}
