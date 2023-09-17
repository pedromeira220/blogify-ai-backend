export interface PublicationDTOProps {
  id: string
  title: string
  subtitle: string
  slug: string
  blogId: string
  creationDate: Date
  content: string
  thumbnailId: string
}

export class PublicationDTO implements PublicationDTOProps {
  id: string
  title: string
  subtitle: string
  slug: string
  blogId: string
  creationDate: Date
  content: string
  thumbnailId: string

  constructor({
    id,
    title,
    subtitle,
    slug,
    blogId,
    creationDate,
    content,
    thumbnailId,
  }: PublicationDTOProps) {
    this.id = id
    this.title = title
    this.subtitle = subtitle
    this.slug = slug
    this.blogId = blogId
    this.creationDate = creationDate
    this.content = content
    this.thumbnailId = thumbnailId
  }
}
