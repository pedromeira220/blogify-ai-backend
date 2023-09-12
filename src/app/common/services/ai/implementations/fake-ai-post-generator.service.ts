import { Blog } from '@/app/api/blogs/entities/blog.entity'
import { Publication } from '@/app/api/publications/entities/publication.entity'
import { PostFromAi } from '@/app/api/publications/value-objects/post-from-ai'
import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { AiPostGeneratorAdapter } from '../ai-post-generator.adapter'

@Injectable()
export class FakeAiPostGeneratorService implements AiPostGeneratorAdapter {
  async generate(
    blog: Blog,
    alreadyGeneratedPublications: Publication[],
  ): Promise<PostFromAi> {
    return new PostFromAi({
      content: faker.lorem.paragraphs(),
      id: new UniqueEntityId(),
      subtitle: faker.lorem.sentence(),
      thumbnailSearchTerm: faker.animal.type(),
      title: faker.lorem.text(),
    })
  }
}
