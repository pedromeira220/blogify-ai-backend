import { ImageSearcherAdapter } from '@/app/common/services/image/image-searcher.adpter'
import { UnsplashImageSearcherService } from '@/app/common/services/image/implementations/unplash-image-searcher.service'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ImagesController } from './images.controller'
import { ImagesService } from './images.service'
import { PrismaSearchableImageRepository } from './repositories/implementations/prisma-searchable-image.repository'
import { SearchableImageRepository } from './repositories/searchable-image.repository'

@Module({
  imports: [HttpModule],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    {
      provide: SearchableImageRepository,
      useClass: PrismaSearchableImageRepository,
    },
    {
      provide: ImageSearcherAdapter,
      useClass: UnsplashImageSearcherService,
    },
  ],
  exports: [ImagesService, SearchableImageRepository, ImageSearcherAdapter],
})
export class ImagesModule {}
