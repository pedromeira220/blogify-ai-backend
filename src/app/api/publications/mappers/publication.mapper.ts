import { Publication as PrismaPublication } from '@prisma/client'
import { Publication } from '../entities/publication.entity'

export class PublicationMapper {
  static fromDomainToPrisma(publication: Publication): PrismaPublication {
    return {
      blog_id: publication.blogId.toString(),
      content: publication.content.value,
      creation_date: publication.creationDate,
      id: publication.id.toString(),
      slug: publication.slug.value,
      subtitle: publication.subtitle,
      thumbnail_id: publication.thumbnailId.toString(),
      title: publication.title,
    }
  }
}
