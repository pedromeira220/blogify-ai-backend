import { ResponseDTO } from '@/app/common/dtos/response.dto'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { BlogsService } from './blogs.service'
import { BlogDTO } from './dtos/blog.dto'
import { CreateBlogDTO } from './dtos/create-blog.dto'
import { BlogMapper } from './mappers/blog.mapper'

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async createBlog(@Body() createBlogDTO: CreateBlogDTO) {
    await this.blogsService.create({
      theme: createBlogDTO.theme,
      description: createBlogDTO.description,
      slug: createBlogDTO.slug,
      primaryColor: createBlogDTO.primaryColor,
      name: createBlogDTO.name,
    })
  }

  @Get('/:slug')
  async getBySlug(@Param('slug') slug: string): Promise<ResponseDTO<BlogDTO>> {
    const blog = await this.blogsService.getBySlug({ slug })

    return BlogMapper.fromDomainToHttp(blog)
  }
}
