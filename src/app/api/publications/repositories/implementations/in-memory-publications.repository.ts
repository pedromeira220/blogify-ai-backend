import { Page } from '@/app/common/value-objects/page'
import { Pageable } from '@/app/common/value-objects/pageable'
import { Slug } from '@/app/common/value-objects/slug'
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

  async fetchAllBySlug(
    slug: Slug,
    pageable: Pageable,
  ): Promise<Page<Publication>> {
    throw new Error('Method not implemented.')
  }

  async findByBlogAndPublicationSlug(
    blogSlug: Slug,
    publicationSlug: Slug,
    pageable: Pageable,
  ): Promise<Publication | null> {
    throw new Error('Method not implemented.')
  }

  async countByBlogSlug(blogSlug: Slug): Promise<number> {
    throw new Error('Method not implemented.')
  }
}
