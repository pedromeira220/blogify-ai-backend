interface ImageDTOProps {
  id: string
  src: string
}

export class ImageDTO implements ImageDTOProps {
  id: string
  src: string

  constructor({ id, src }: ImageDTOProps) {
    this.id = id
    this.src = src
  }
}
