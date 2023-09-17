import { PageMapper } from '@/app/common/mappers/page.mapper'
import { Pageable } from '@/app/common/value-objects/pageable'
import { Slug } from '@/app/common/value-objects/slug'
import { Controller, Get, Param } from '@nestjs/common'
import { PublicationMinimalDTO } from './dtos/publication-minimal.dto'
import { PublicationMapper } from './mappers/publication.mapper'
import { PublicationsService } from './publications.service'

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Get('/:slug')
  async getAllFromBlog(@Param('slug') slug: string) {
    const publicationFromBlog = await this.publicationsService.getAllFromBlog({
      slug: Slug.create(slug),
      pageable: new Pageable({
        pageNumber: 0,
        pageSize: 20,
      }),
    })

    console.log('> publicationFromBlog', publicationFromBlog)

    const publicationsAsDTO = publicationFromBlog.content.map(
      PublicationMapper.fromDomainToMinimalDTO,
    )

    return PageMapper.toHttp<PublicationMinimalDTO>(
      publicationFromBlog,
      publicationsAsDTO,
    )
  }
}
