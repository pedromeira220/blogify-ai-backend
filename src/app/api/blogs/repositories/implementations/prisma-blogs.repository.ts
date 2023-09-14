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
}
