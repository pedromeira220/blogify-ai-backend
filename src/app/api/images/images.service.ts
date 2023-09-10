import { Injectable } from '@nestjs/common'
import { SearchableImage } from './entities/searchable-image.entity'
import { SearchableImageRepository } from './repositories/searchable-image.repository'

@Injectable()
export class ImagesService {
  constructor(
    private readonly searchableImageRepository: SearchableImageRepository,
  ) {}

  async createImageBySearchTerm(searchTerm: string) {
    const src = '' // TODO: fazer a busca para o serviço de imagens passando o search term

    const searchableImage = SearchableImage.create({
      src,
      searchTerm,
    })

    await this.searchableImageRepository.create(searchableImage)

    return searchableImage
  }
}
