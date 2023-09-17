import { ImageDTO } from '../../images/dto/image.dto'

export interface PublicationDTOProps {
  id: string
  title: string
  subtitle: string
  slug: string
  blogId: string
  creationDate: Date
  content: string
  thumbnail: ImageDTO
}

export class PublicationDTO implements PublicationDTOProps {
  id: string
  title: string
  subtitle: string
  slug: string
  blogId: string
  creationDate: Date
  content: string
  thumbnail: ImageDTO

  constructor({
    id,
    title,
    subtitle,
    slug,
    blogId,
    creationDate,
    content,
    thumbnail,
  }: PublicationDTOProps) {
    this.id = id
    this.title = title
    this.subtitle = subtitle
    this.slug = slug
    this.blogId = blogId
    this.creationDate = creationDate
    this.content = content
    this.thumbnail = thumbnail
  }
}
