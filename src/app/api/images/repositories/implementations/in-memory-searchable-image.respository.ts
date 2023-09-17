import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { SearchableImage } from '../../entities/searchable-image.entity'
import { SearchableImageRepository } from '../searchable-image.repository'

@Injectable()
export class InMemorySearchableImageRepository
  implements SearchableImageRepository
{
  public items: SearchableImage[] = []

  async create(searchableImage: SearchableImage): Promise<void> {
    this.items.push(searchableImage)
  }

  async getAll(): Promise<SearchableImage[]> {
    return this.items
  }

  async findById(id: UniqueEntityId): Promise<SearchableImage | null> {
    throw new Error('Method not implemented.')
  }

  async findManyByIdList(idList: UniqueEntityId[]): Promise<SearchableImage[]> {
    throw new Error('Method not implemented.')
  }
}
