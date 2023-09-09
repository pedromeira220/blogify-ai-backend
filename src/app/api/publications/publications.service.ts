import { Injectable } from '@nestjs/common'
import { Blog } from '../blogs/entities/blog.entity'
import { Publication } from './entities/publication.entity'
import { makePublication } from '@test/factories/make-publication'
import { PublicationsRepository } from './repositories/publications.repository'

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository,
  ) {}

  async generateAndCreatePublicationsForBlog(
    blog: Blog,
  ): Promise<Publication[]> {
    // TODO: adicionar a lógica com a IA

    const fakePublications = Array.from({
      length: 6,
    }).map(() => {
      return makePublication({
        blogId: blog.id,
      })
    })

    // TODO: adicionar lógica para criar as imagens com base nos termos retornados pela IA

    await this.publicationsRepository.createMany(fakePublications)

    return fakePublications
  }
}
