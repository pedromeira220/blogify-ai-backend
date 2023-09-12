import { Blog } from '@/app/api/blogs/entities/blog.entity'
import { Publication } from '@/app/api/publications/entities/publication.entity'
import { PostFromAi } from '@/app/api/publications/value-objects/post-from-ai'

export abstract class AiPostGeneratorAdapter {
  abstract generate(
    blog: Blog,
    alreadyGeneratedPublications: Publication[],
  ): Promise<PostFromAi>
}
