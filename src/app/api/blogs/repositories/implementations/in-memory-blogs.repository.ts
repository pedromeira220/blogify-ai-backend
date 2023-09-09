import { Blog } from '../../entities/blog.entity'
import { BlogsRepository } from '../blogs.repository'

export class InMemoryBlogsRepository implements BlogsRepository {
  public items: Blog[] = []

  async create(blog: Blog): Promise<void> {
    this.items.push(blog)
  }
}
