import { Test, TestingModule } from '@nestjs/testing'
import { PublicationsService } from './publications.service'
import { PublicationsRepository } from './repositories/publications.repository'
import { InMemoryPublicationsRepository } from './repositories/implementations/in-memory-publications.repository'

describe('PublicationsService', () => {
  let service: PublicationsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublicationsService,
        {
          provide: PublicationsRepository,
          useClass: InMemoryPublicationsRepository,
        },
      ],
    }).compile()

    service = module.get<PublicationsService>(PublicationsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
