import { AiPostGeneratorAdapter } from '@/app/common/services/ai/ai-post-generator.adapter'
import { Page } from '@/app/common/value-objects/page'
import { Pageable } from '@/app/common/value-objects/pageable'
import { Slug } from '@/app/common/value-objects/slug'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Blog } from '../blogs/entities/blog.entity'
import { SearchableImage } from '../images/entities/searchable-image.entity'
import { ImagesService } from '../images/images.service'
import { SearchableImageRepository } from '../images/repositories/searchable-image.repository'
import { Publication } from './entities/publication.entity'
import { PublicationMapper } from './mappers/publication.mapper'
import { PublicationsRepository } from './repositories/publications.repository'
import { PublicationContent } from './value-objects/publication-content'

interface GetAllFromBlogRequest {
  slug: Slug
  pageable: Pageable
}

interface GetAllFromBlogAndPublicationSlugRequest {
  blogSlug: Slug
  publicationSlug: Slug
  pageable: Pageable
}

interface IsPublicationsFromBlogReadyRequest {
  blogSlug: Slug
}

@Injectable()
export class PublicationsService {
  private NUMBER_OF_PUBLICATIONS_TO_GENERATE = 6

  constructor(
    private readonly publicationsRepository: PublicationsRepository,
    private readonly imagesService: ImagesService,
    private readonly aiPostGenerator: AiPostGeneratorAdapter,
    private readonly searchableImageRepository: SearchableImageRepository,
  ) {}

  async generateAndCreatePublicationsForBlog(
    blog: Blog,
  ): Promise<Publication[]> {
    const alreadyGeneratedPublications: Publication[] = []

    // TODO: verificar se isso aqui funciona (não tenho certeza se o await funciona dentro de um for)
    for (let i = 0; i < this.NUMBER_OF_PUBLICATIONS_TO_GENERATE; i++) {
      const generatedPublication = await this.generateOnePublicationForBlog(
        blog,
        alreadyGeneratedPublications,
      )

      alreadyGeneratedPublications.push(generatedPublication)
    }

    /* const generatedPublication = await this.generateOnePublicationForBlog(
      blog,
      alreadyGeneratedPublications,
    )

    alreadyGeneratedPublications.push(generatedPublication) */

    return alreadyGeneratedPublications
  }

  async generateOnePublicationForBlog(
    blog: Blog,
    alreadyGeneratedPublications: Publication[],
  ) {
    const postFromAi = await this.aiPostGenerator.generate(
      blog,
      alreadyGeneratedPublications,
    )

    const searchableImage = await this.imagesService.createImageBySearchTerm(
      postFromAi.thumbnailSearchTerm,
    )

    const publication = Publication.create({
      blogId: blog.id,
      title: postFromAi.title,
      content: PublicationContent.create(postFromAi.content),
      subtitle: postFromAi.subtitle,
      thumbnailId: searchableImage.id,
    })

    await this.publicationsRepository.create(publication)

    return publication
  }

  async getAllFromBlog({ slug, pageable }: GetAllFromBlogRequest) {
    const publications = await this.publicationsRepository.fetchAllBySlug(
      slug,
      pageable,
    )

    const images = await this.searchableImageRepository.findManyByIdList(
      publications.content.map((publication) => publication.thumbnailId),
    )

    const publicationDTOs = publications.content.map((publication) => {
      return PublicationMapper.fromDomainToDTO(
        publication,
        images.find((image) =>
          publication.thumbnailId.equals(image.id),
        ) as SearchableImage,
      )
    })

    return Page.create({
      content: publicationDTOs,
      pageNumber: publications.pageNumber,
      pageSize: publications.pageSize,
      totalElements: publications.totalElements,
    })
  }

  async getFromBlogAndPublicationSlug({
    blogSlug,
    publicationSlug,
    pageable,
  }: GetAllFromBlogAndPublicationSlugRequest) {
    const publicationFound =
      await this.publicationsRepository.findByBlogAndPublicationSlug(
        blogSlug,
        publicationSlug,
        pageable,
      )

    if (!publicationFound) {
      throw new NotFoundException('Publication not found')
    }

    const publicationThumbnail = await this.searchableImageRepository.findById(
      publicationFound.thumbnailId,
    )

    if (!publicationThumbnail) {
      throw new NotFoundException('Publication thumbnail not found')
    }

    return {
      publication: publicationFound,
      publicationThumbnail,
    }
  }

  async isPublicationsFromBlogReady({
    blogSlug,
  }: IsPublicationsFromBlogReadyRequest) {
    const publicationsFromBlogCount =
      await this.publicationsRepository.countByBlogSlug(blogSlug)

    return publicationsFromBlogCount === this.NUMBER_OF_PUBLICATIONS_TO_GENERATE
  }
}
