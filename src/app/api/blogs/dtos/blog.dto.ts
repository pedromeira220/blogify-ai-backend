interface BlogDTOProps {
  id: string
  theme: string
  description: string
  name: string
  slug: string
  primaryColor: string
  creationDate: Date
}

export class BlogDTO implements BlogDTOProps {
  id: string
  theme: string
  description: string
  name: string
  slug: string
  primaryColor: string
  creationDate: Date

  constructor({
    creationDate,
    description,
    id,
    name,
    primaryColor,
    slug,
    theme,
  }: BlogDTOProps) {
    this.creationDate = creationDate
    this.description = description
    this.id = id
    this.name = name
    this.primaryColor = primaryColor
    this.slug = slug
    this.theme = theme
  }
}
