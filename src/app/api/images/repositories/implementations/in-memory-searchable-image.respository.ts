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
}
