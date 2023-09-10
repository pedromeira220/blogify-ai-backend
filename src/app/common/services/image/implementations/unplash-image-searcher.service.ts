import { ImageSearcherResponse } from '../../../value-objects/image-searcher-response'
import {
  ImageSearcherAdapter,
  SearchImageParams,
} from '../image-searcher.adpter'
import { UnsplashResponse } from '@/app/common/interfaces/unsplash-response.interface'
import { EnvService } from '@/app/core/env/env.service'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UnsplashImageSearcherService implements ImageSearcherAdapter {
  constructor(
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {}

  async searchImage(params: SearchImageParams): Promise<ImageSearcherResponse> {
    const url = new URL('https://api.unsplash.com/search/photos')

    url.searchParams.set('page', '1')
    url.searchParams.set('query', params.searchTerm)
    url.searchParams.set('client_id', this.envService.get('UNSPLASH_CLIENT_ID'))

    const response = await this.httpService.axiosRef.get<UnsplashResponse>(
      url.toString(),
    )

    return new ImageSearcherResponse({
      src: {
        original: response.data.results[0].urls.raw,
        small: response.data.results[0].urls.small,
      },
    })
  }
}
