import { Injectable } from '@nestjs/common'
import { Blog } from '../blogs/entities/blog.entity'
import { Publication } from './entities/publication.entity'
import { PublicationsRepository } from './repositories/publications.repository'
import { ImagesService } from '../images/images.service'
import { PostFromAi } from './value-objects/post-from-ai'
import { PublicationContent } from './value-objects/publication-content'
import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'

@Injectable()
export class PublicationsService {
  private NUMBER_OF_PUBLICATIONS_TO_GENERATE = 6

  constructor(
    private readonly publicationsRepository: PublicationsRepository,
    private readonly imagesService: ImagesService,
  ) {}

  async generateAndCreatePublicationsForBlog(
    blog: Blog,
  ): Promise<Publication[]> {
    const alreadyGeneratedPublications: Publication[] = []

    for (let i = 0; i < this.NUMBER_OF_PUBLICATIONS_TO_GENERATE; i++) {
      const generatedPublication = await this.generateOnePublicationForBlog(
        blog,
        alreadyGeneratedPublications,
      )

      alreadyGeneratedPublications.push(generatedPublication)
    }

    return alreadyGeneratedPublications
  }

  async generateOnePublicationForBlog(
    blog: Blog,
    alreadyGeneratedPublications: Publication[],
  ) {
    const postFromAi = new PostFromAi({
      content: 'Test content',
      id: new UniqueEntityId(),
      subtitle: 'Test subtitle',
      title: 'Test title',
      thumbnailSearchTerm: 'Test search term',
    }) // TODO: usar aqui o chat gpt para gerar o blog

    const searchableImage = await this.imagesService.createImageBySearchTerm(
      postFromAi.thumbnailSearchTerm,
    )

    const publication = Publication.create({
      blogId: blog.id,
      title: postFromAi.title,
      content: PublicationContent.create(postFromAi.content),
      subtitle: postFromAi.content,
      thumbnailId: searchableImage.id,
    })

    await this.publicationsRepository.create(publication)

    return publication
  }
}
