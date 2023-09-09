import { Blog } from '../entities/blog.entity'

export abstract class BlogsRepository {
  abstract create(blog: Blog): Promise<void>
}
