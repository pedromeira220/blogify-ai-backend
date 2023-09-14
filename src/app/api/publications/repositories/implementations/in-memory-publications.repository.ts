import { Injectable } from '@nestjs/common'
import { Publication } from '../../entities/publication.entity'
import { PublicationsRepository } from '../publications.repository'

@Injectable()
export class InMemoryPublicationsRepository implements PublicationsRepository {
  public items: Publication[] = []

  async createMany(publications: Publication[]): Promise<void> {
    this.items = this.items.concat(publications)
  }

  async create(publication: Publication): Promise<void> {
    this.items.push(publication)
  }

  async getAll(): Promise<Publication[]> {
    return this.items
  }
}
