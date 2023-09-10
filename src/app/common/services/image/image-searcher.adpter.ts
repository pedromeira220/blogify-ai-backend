import { ImageSearcherResponse } from './../../value-objects/image-searcher-response'
export interface SearchImageParams {
  searchTerm: string
}

export abstract class ImageSearcherAdapter {
  abstract searchImage(
    params: SearchImageParams,
  ): Promise<ImageSearcherResponse>
}
