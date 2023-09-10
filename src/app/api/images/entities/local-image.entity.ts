import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { Image, ImageProps } from './image.entity'

export interface LocalImageProps extends ImageProps {
  fileName: string
}

export class LocalImage extends Image<LocalImageProps> {
  get fileName() {
    return this.props.fileName
  }

  static create(props: LocalImageProps, id?: UniqueEntityId) {
    const localImage = new LocalImage(
      Image.makeProps<LocalImageProps>({
        ...props,
      }),
      id,
    )

    return localImage
  }
}
