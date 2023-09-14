import { Body, Controller, Post } from '@nestjs/common'
import { BlogsService } from './blogs.service'
import { CreateBlogDTO } from './dtos/create-blog.dto'

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
}
