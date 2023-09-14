import { Blog as PrismaBlog } from '@prisma/client'
import { Blog } from '../entities/blog.entity'

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
}
