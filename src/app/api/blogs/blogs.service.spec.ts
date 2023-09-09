import { Test, TestingModule } from '@nestjs/testing'
import { BlogsService } from './blogs.service'
import { BlogsRepository } from './repositories/blogs.repository'
import { InMemoryBlogsRepository } from './repositories/implementations/in-memory-blogs.repository'
import { PublicationsModule } from '../publications/publications.module'

describe('BlogsService', () => {
  let service: BlogsService
  let repository: InMemoryBlogsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        {
          provide: BlogsRepository,
          useClass: InMemoryBlogsRepository,
        },
      ],
      imports: [PublicationsModule],
    }).compile()

    service = module.get<BlogsService>(BlogsService)
    repository = module.get<InMemoryBlogsRepository>(BlogsRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be able to create an blog', async () => {
    expect(
      service.create({
        description: 'Description test',
        name: 'blog test',
        primaryColor: 'BLUE',
        slug: 'blog-test',
        theme: 'A theme test',
      }),
    ).resolves.not.toThrow()
    expect(repository.items.length).toBe(1)
  })
})
