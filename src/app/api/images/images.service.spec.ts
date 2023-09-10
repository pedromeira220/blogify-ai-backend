import { Test, TestingModule } from '@nestjs/testing'
import { ImagesService } from './images.service'
import { SearchableImageRepository } from './repositories/searchable-image.repository'
import { InMemorySearchableImageRepository } from './repositories/implementations/in-memory-searchable-image.respository'
import { ImageSearcherAdapter } from '@/app/common/services/image/image-searcher.adpter'

import { HttpModule } from '@nestjs/axios'
import { FakeImageSearcherService } from '@/app/common/services/image/implementations/fake-image-searcher.service'

describe.only('ImagesService', () => {
  let service: ImagesService
  let repository: InMemorySearchableImageRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ImagesService,
        {
          provide: SearchableImageRepository,
          useClass: InMemorySearchableImageRepository,
        },
        {
          provide: ImageSearcherAdapter,
          useClass: FakeImageSearcherService,
        },
      ],
    }).compile()

    service = module.get<ImagesService>(ImagesService)
    repository = module.get<InMemorySearchableImageRepository>(
      SearchableImageRepository,
    )
  })

  it('should be able to create an image by a search term', async () => {
    const SEARCH_TERM = 'Earth'

    const searchableImage = await service.createImageBySearchTerm(SEARCH_TERM)

    console.log(searchableImage.src)

    expect(typeof searchableImage.src).toBe('string')
    expect(repository.items).toHaveLength(1)
  })
})
