import { Module } from '@nestjs/common'
import { UnsplashImageSearcherService } from './app/common/services/image/implementations/unplash-image-searcher.service'

@Module({
  imports: [],
  controllers: [],
  providers: [UnsplashImageSearcherService],
})
export class AppModule {}
