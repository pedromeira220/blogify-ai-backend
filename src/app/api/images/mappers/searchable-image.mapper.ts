import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { Image } from '@prisma/client'
import { ImageDTO } from '../dto/image.dto'
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

  static fromDomainToDTO(searchableImage: SearchableImage): ImageDTO {
    return new ImageDTO({
      id: searchableImage.id.toString(),
      src: searchableImage.src,
    })
  }

  static fromPrismaToDomain(prismaSearchableImage: Image): SearchableImage {
    return SearchableImage.create(
      {
        searchTerm: prismaSearchableImage.searchable_image_search_term ?? '',
        src: prismaSearchableImage.src,
      },
      new UniqueEntityId(prismaSearchableImage.id),
    )
  }
}
