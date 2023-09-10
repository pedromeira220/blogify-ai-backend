import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { Image, ImageProps } from './image.entity'

export interface SearchableImageProps extends ImageProps {
  searchTerm: string
}

export class SearchableImage extends Image<SearchableImageProps> {
  get searchTerm() {
    return this.props.searchTerm
  }

  static create(props: SearchableImageProps, id?: UniqueEntityId) {
    const searchableImage = new SearchableImage(
      Image.makeProps<SearchableImageProps>({
        ...props,
      }),
      id,
    )

    return searchableImage
  }
}
