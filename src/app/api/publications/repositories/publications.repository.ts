import { Page } from '@/app/common/value-objects/page'
import { Pageable } from '@/app/common/value-objects/pageable'
import { Slug } from '@/app/common/value-objects/slug'
import { Publication } from '../entities/publication.entity'

export abstract class PublicationsRepository {
  abstract createMany(publications: Publication[]): Promise<void>
  abstract create(publication: Publication): Promise<void>
  abstract getAll(): Promise<Publication[]>
  abstract fetchAllBySlug(
    slug: Slug,
    pageable: Pageable,
  ): Promise<Page<Publication>>
}
