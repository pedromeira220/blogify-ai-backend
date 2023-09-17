import { ResponseDTO } from '@/app/common/dtos/response.dto'
import { PageMapper } from '@/app/common/mappers/page.mapper'
import { Pageable } from '@/app/common/value-objects/pageable'
import { Slug } from '@/app/common/value-objects/slug'
import { Controller, Get, Param } from '@nestjs/common'
import { PublicationDTO } from './dtos/publication.dto'
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

    return PageMapper.toHttp<PublicationDTO>(
      publicationFromBlog,
      publicationFromBlog.content,
    )
  }

  @Get('/:blogSlug/:publicationSlug')
  async getAllFromBlogAndPublicationSlug(
    @Param('blogSlug') blogSlug: string,
    @Param('publicationSlug') publicationSlug: string,
  ): Promise<ResponseDTO<PublicationDTO>> {
    const { publication, publicationThumbnail } =
      await this.publicationsService.getFromBlogAndPublicationSlug({
        blogSlug: Slug.create(blogSlug),
        publicationSlug: Slug.create(publicationSlug),
        pageable: new Pageable({
          pageNumber: 0,
          pageSize: 20,
        }),
      })

    return PublicationMapper.fromDomainToHttp(publication, publicationThumbnail)
  }

  @Get('/blogs/:blogSlug/ready')
  async isPublicationsFromBlogReady(@Param('blogSlug') blogSlug: string) {
    const isReady = await this.publicationsService.isPublicationsFromBlogReady({
      blogSlug: Slug.create(blogSlug),
    })

    return new ResponseDTO({ data: isReady })
  }
}
