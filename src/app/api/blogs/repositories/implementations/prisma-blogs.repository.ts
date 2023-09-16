import { Slug } from '@/app/common/value-objects/slug'
import { PrismaService } from '@/app/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Blog } from '../../entities/blog.entity'
import { BlogMapper } from '../../mappers/blog.mapper'
import { BlogsRepository } from '../blogs.repository'

@Injectable()
export class PrismaBlogsRepository implements BlogsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(blog: Blog): Promise<void> {
    await this.prisma.blog.create({
      data: BlogMapper.fromDomainToPrisma(blog),
    })
  }

  getAll(): Promise<Blog[]> {
    throw new Error('Method not implemented.')
  }

  async findOneBySlug(slug: Slug): Promise<Blog | null> {
    const blog = await this.prisma.blog.findFirst({
      where: {
        slug: slug.value,
      },
    })

    if (!blog) {
      return null
    }

    return BlogMapper.fromPrismaToDomain(blog)
  }
}
