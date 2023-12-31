import { AiBlogPrimaryColorGeneratorAdapter } from '@/app/common/services/ai/ai-blog-primary-color-generator.adapter'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Slug } from '../../common/value-objects/slug'
import { PublicationsService } from '../publications/publications.service'
import { Blog } from './entities/blog.entity'
import { BlogsRepository } from './repositories/blogs.repository'
import { PrimaryColor, PrimaryColorType } from './value-objects/primary-color'

export type PrimaryColorOptions = PrimaryColorType | 'ASK_AI'
interface CreateRequest {
  theme: string
  description: string
  name: string
  slug: string
  primaryColor: PrimaryColorOptions
}

interface GetBySlugRequest {
  slug: string
}

@Injectable()
export class BlogsService {
  constructor(
    private readonly blogsRepository: BlogsRepository,
    private readonly publicationService: PublicationsService,
    private readonly aiBlogPrimaryColorGenerator: AiBlogPrimaryColorGeneratorAdapter,
  ) {}

  async create({
    description,
    name,
    primaryColor,
    slug,
    theme,
  }: CreateRequest) {
    let primaryColorValueObject: PrimaryColor

    if (primaryColor === 'ASK_AI') {
      primaryColorValueObject = await this.aiBlogPrimaryColorGenerator.generate(
        {
          description,
          name,
          theme,
        },
      )
    } else {
      primaryColorValueObject = new PrimaryColor(primaryColor, false)
    }

    const blog = Blog.create({
      description,
      name,
      primaryColor: primaryColorValueObject,
      theme,
      slug: Slug.createFromText(slug),
    })

    await this.blogsRepository.create(blog)

    this.publicationService.generateAndCreatePublicationsForBlog(blog)
  }

  async getBySlug({ slug }: GetBySlugRequest) {
    const blogFound = await this.blogsRepository.findOneBySlug(
      Slug.create(slug),
    )

    if (!blogFound) {
      throw new NotFoundException('Blog not found')
    }

    return blogFound
  }
}
