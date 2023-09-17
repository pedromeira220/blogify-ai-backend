interface PublicationMinimalDTOProps {
  id: string
  title: string
  subtitle: string
  slug: string
  blogId: string
  creationDate: Date
  thumbnailId: string // TODO: colocar a ImageDTO aqui, pois na listagem das publications é necessário que os dados da imagem também sejam inclusos
}

export class PublicationMinimalDTO implements PublicationMinimalDTOProps {
  id: string
  title: string
  subtitle: string
  slug: string
  blogId: string
  creationDate: Date
  thumbnailId: string

  constructor({
    blogId,
    creationDate,
    id,
    slug,
    subtitle,
    thumbnailId,
    title,
  }: PublicationMinimalDTOProps) {
    this.blogId = blogId
    this.creationDate = creationDate
    this.id = id
    this.slug = slug
    this.subtitle = subtitle
    this.thumbnailId = thumbnailId
    this.title = title
  }
}
