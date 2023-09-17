import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { SearchableImage } from './../entities/searchable-image.entity'
export abstract class SearchableImageRepository {
  abstract create(searchableImage: SearchableImage): Promise<void>
  abstract getAll(): Promise<SearchableImage[]>
  abstract findById(id: UniqueEntityId): Promise<SearchableImage | null>
  abstract findManyByIdList(
    idList: UniqueEntityId[],
  ): Promise<SearchableImage[]>
}
