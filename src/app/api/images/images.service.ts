import { ImageSearcherAdapter } from '@/app/common/services/image/image-searcher.adpter'
import { Injectable } from '@nestjs/common'
import { SearchableImage } from './entities/searchable-image.entity'
import { SearchableImageRepository } from './repositories/searchable-image.repository'

@Injectable()
export class ImagesService {
  constructor(
    private readonly searchableImageRepository: SearchableImageRepository,
    private readonly imageSearcherService: ImageSearcherAdapter,
  ) {}

  async createImageBySearchTerm(searchTerm: string) {
    const imageSearcherResponse = await this.imageSearcherService.searchImage({
      searchTerm,
    })

    const searchableImage = SearchableImage.create({
      src: imageSearcherResponse.src.original,
      searchTerm,
    })

    await this.searchableImageRepository.create(searchableImage)

    return searchableImage
  }

  async getAll() {
    return this.searchableImageRepository.getAll()
  }
}
