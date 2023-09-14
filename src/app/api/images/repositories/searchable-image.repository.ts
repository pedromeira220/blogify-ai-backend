import { SearchableImage } from './../entities/searchable-image.entity';
export abstract class SearchableImageRepository {
  abstract create(searchableImage: SearchableImage): Promise<void>
  abstract getAll(): Promise<SearchableImage[]>
}
