import { Slug } from '@/app/common/value-objects/slug'
import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { Publication as PrismaPublication } from '@prisma/client'
import { PublicationMinimalDTO } from '../dtos/publication-minimal.dto'
import { Publication } from '../entities/publication.entity'
import { PublicationContent } from '../value-objects/publication-content'

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

  static fromPrismaToDomain(prismaPublication: PrismaPublication): Publication {
    return Publication.create(
      {
        blogId: new UniqueEntityId(prismaPublication.blog_id),
        content: PublicationContent.create(prismaPublication.content),
        subtitle: prismaPublication.subtitle,
        thumbnailId: new UniqueEntityId(prismaPublication.thumbnail_id),
        title: prismaPublication.title,
        creationDate: prismaPublication.creation_date,
        slug: Slug.create(prismaPublication.slug),
      },
      new UniqueEntityId(prismaPublication.id),
    )
  }

  static fromDomainToMinimalDTO(
    publication: Publication,
  ): PublicationMinimalDTO {
    return new PublicationMinimalDTO({
      blogId: publication.blogId.toString(),
      creationDate: publication.creationDate,
      id: publication.id.toString(),
      slug: publication.slug.value,
      subtitle: publication.subtitle,
      thumbnailId: publication.thumbnailId.toString(),
      title: publication.title,
    })
  }
}
