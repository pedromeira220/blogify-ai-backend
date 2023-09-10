import { Publication } from '../entities/publication.entity'

export abstract class PublicationsRepository {
  abstract createMany(publications: Publication[]): Promise<void>
  abstract create(publication: Publication): Promise<void>
}
