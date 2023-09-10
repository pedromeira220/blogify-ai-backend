import { Entity } from '@/app/common/entities/entity.entity'

export interface ImageProps {
  src: string
}

export abstract class Image<Props extends ImageProps> extends Entity<Props> {
  get src() {
    return this.props.src
  }

  static makeProps<Props extends ImageProps>(props: Props) {
    return {
      ...props,
    }
  }
}
