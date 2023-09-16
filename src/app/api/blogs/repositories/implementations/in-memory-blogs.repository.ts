import { Slug } from '@/app/common/value-objects/slug'
import { Injectable } from '@nestjs/common'
import { Blog } from '../../entities/blog.entity'
import { BlogsRepository } from '../blogs.repository'

@Injectable()
export class InMemoryBlogsRepository implements BlogsRepository {
  public items: Blog[] = []

  async create(blog: Blog): Promise<void> {
    this.items.push(blog)
  }

  async getAll(): Promise<Blog[]> {
    return this.items
  }

  async findOneBySlug(slug: Slug): Promise<Blog | null> {
    const blogFound = this.items.find((blog) => blog.slug.value === slug.value)

    if (!blogFound) {
      return null
    }

    return blogFound
  }
}
