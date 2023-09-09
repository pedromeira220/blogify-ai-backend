import { Publication } from '../../entities/publication.entity'
import { PublicationsRepository } from '../publications.repository'

export class InMemoryPublicationsRepository implements PublicationsRepository {
  public items: Publication[] = []

  async createMany(publications: Publication[]): Promise<void> {
    this.items = this.items.concat(publications)
  }
}
