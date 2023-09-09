import { Injectable } from '@nestjs/common'
import { PrimaryColor, PrimaryColorType } from './value-objects/primary-color'
import { Blog } from './entities/blog.entity'
import { Slug } from '../../common/value-objects/slug'
import { BlogsRepository } from './repositories/blogs.repository'
import { PublicationsService } from '../publications/publications.service'

type PrimaryColorOptions = PrimaryColorType | 'ASK_AI'
interface CreateRequest {
  theme: string
  description: string
  name: string
  slug: string
  primaryColor: PrimaryColorOptions
}

@Injectable()
export class BlogsService {
  constructor(
    private readonly blogsRepository: BlogsRepository,
    private readonly publicationService: PublicationsService,
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
      // TODO: usar aqui a IA para escolher a cor primária

      primaryColorValueObject = new PrimaryColor('BLUE', true)
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

    await this.publicationService.generateAndCreatePublicationsForBlog(blog)
  }
}
