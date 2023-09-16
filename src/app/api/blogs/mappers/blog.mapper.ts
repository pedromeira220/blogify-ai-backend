import { ResponseDTO } from '@/app/common/dtos/respose.dto'
import { Slug } from '@/app/common/value-objects/slug'
import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { Blog as PrismaBlog } from '@prisma/client'
import { BlogDTO } from '../dtos/blog.dto'
import { Blog } from '../entities/blog.entity'
import { PrimaryColor } from '../value-objects/primary-color'

export class BlogMapper {
  static fromDomainToPrisma(blog: Blog): PrismaBlog {
    console.log(blog)

    return {
      creation_date: blog.creationDate,
      description: blog.description,
      id: blog.id.toString(),
      name: blog.name,
      primary_color: blog.primaryColor.value,
      slug: blog.slug.value,
      theme: blog.theme,
    }
  }

  static fromPrismaToDomain(prismaBlog: PrismaBlog): Blog {
    return Blog.create(
      {
        description: prismaBlog.description,
        name: prismaBlog.name,
        primaryColor: new PrimaryColor(prismaBlog.primary_color, false),
        slug: Slug.create(prismaBlog.slug),
        theme: prismaBlog.name,
        creationDate: prismaBlog.creation_date,
      },
      new UniqueEntityId(prismaBlog.id),
    )
  }

  static fromDomainToDTO(blog: Blog): BlogDTO {
    return new BlogDTO({
      creationDate: blog.creationDate,
      description: blog.description,
      id: blog.id.toString(),
      name: blog.name,
      primaryColor: blog.primaryColor.value,
      slug: blog.slug.value,
      theme: blog.theme,
    })
  }

  static fromDomainToHttp(blog: Blog): ResponseDTO<BlogDTO> {
    return new ResponseDTO({ data: this.fromDomainToDTO(blog) })
  }
}
