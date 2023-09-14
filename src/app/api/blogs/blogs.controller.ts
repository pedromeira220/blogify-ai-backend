import { Controller, Get, Post } from '@nestjs/common'
import { BlogsService } from './blogs.service'

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async createBlog() {
    await this.blogsService.create({
      theme: 'Mundo apple',
      description:
        'um blog sobre o mundo apple, ou seja, novos lançamentos, reviews sobre produtos, noticiais, entre outros.',
      name: 'macmagazine',
      slug: 'macmagazine',
      primaryColor: 'BLUE',
    })
  }

  @Get()
  async getAll() {
    return await this.blogsService.getAll()
  }
}
