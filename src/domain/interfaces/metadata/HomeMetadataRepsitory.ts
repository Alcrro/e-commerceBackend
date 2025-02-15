import { IMetadata } from '../../entities/metadata/Home';

export interface HomeMetadataRepository {
  get(): Promise<IMetadata | null>;
}
