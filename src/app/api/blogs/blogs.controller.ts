import { Controller, Get, Post } from '@nestjs/common'
import { BlogsService } from './blogs.service'

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async createBlog() {
    await this.blogsService.create({
      theme: 'Programação TypeScript para iniciantes',
      description:
        'Um blog que contem conteúdos para iniciantes em programação, nele vai ter tutorais, explicação de conceitos básicos sobre a linguagem entre outros.',
      name: 'Typescript Learn',
      slug: 'typescript-learn',
      primaryColor: 'ASK_AI',
    })
  }

  @Get()
  async getAll() {
    return await this.blogsService.getAll()
  }
}
