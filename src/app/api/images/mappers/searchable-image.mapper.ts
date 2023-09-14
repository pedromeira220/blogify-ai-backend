import { Image } from '@prisma/client'
import { SearchableImage } from '../entities/searchable-image.entity'

export class SearchableImageMapper {
  static fromDomainToPrisma(searchableImage: SearchableImage): Image {
    return {
      id: searchableImage.id.toString(),
      src: searchableImage.src,
      searchable_image_search_term: searchableImage.searchTerm,
      local_image_file_name: null,
    }
  }
}
