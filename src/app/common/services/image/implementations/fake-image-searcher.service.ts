import { ImageSearcherResponse } from '../../../value-objects/image-searcher-response'
import {
  ImageSearcherAdapter,
  SearchImageParams,
} from '../image-searcher.adpter'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FakeImageSearcherService implements ImageSearcherAdapter {
  async searchImage(params: SearchImageParams): Promise<ImageSearcherResponse> {
    return new ImageSearcherResponse({
      src: {
        original: faker.image.urlPicsumPhotos(),
        small: faker.image.urlPicsumPhotos(),
      },
    })
  }
}
