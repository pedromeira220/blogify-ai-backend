import { ImageSearcherResponse } from '../../../value-objects/image-searcher-response'
import {
  ImageSearcherAdapter,
  SearchImageParams,
} from '../image-searcher.adpter'
import { UnsplashResponse } from '@/app/common/interfaces/unsplash-response.interface'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UnsplashImageSearcherService implements ImageSearcherAdapter {
  private clientId = 'Vx98KXnQ4o5PD0FhXTBTBbo-mbl29QXXTpcxlDxQoFs' // TODO: colocar com variável de ambiente

  constructor(private readonly httpService: HttpService) {}

  async searchImage(params: SearchImageParams): Promise<ImageSearcherResponse> {
    const url = new URL('https://api.unsplash.com/search/photos')

    url.searchParams.set('page', '1')
    url.searchParams.set('query', params.searchTerm)
    url.searchParams.set('client_id', this.clientId)

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
