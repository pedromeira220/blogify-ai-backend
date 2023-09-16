import { Slug } from '@/app/common/value-objects/slug'
import { Blog } from '../entities/blog.entity'

export abstract class BlogsRepository {
  abstract create(blog: Blog): Promise<void>
  abstract getAll(): Promise<Blog[]>
  abstract findOneBySlug(slug: Slug): Promise<Blog | null>
}
