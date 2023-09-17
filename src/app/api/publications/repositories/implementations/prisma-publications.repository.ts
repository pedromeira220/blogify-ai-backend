import { Page } from '@/app/common/value-objects/page'
import { Pageable } from '@/app/common/value-objects/pageable'
import { Slug } from '@/app/common/value-objects/slug'
import { PrismaService } from '@/app/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Publication } from '../../entities/publication.entity'
import { PublicationMapper } from '../../mappers/publication.mapper'
import { PublicationsRepository } from '../publications.repository'

@Injectable()
export class PrismaPublicationRepository implements PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(publications: Publication[]): Promise<void> {
    await this.prisma.publication.createMany({
      data: publications.map(PublicationMapper.fromDomainToPrisma),
    })
  }

  async create(publication: Publication): Promise<void> {
    await this.prisma.publication.create({
      data: PublicationMapper.fromDomainToPrisma(publication),
    })
  }

  async getAll(): Promise<Publication[]> {
    throw new Error('Method not implemented.')
  }

  async fetchAllBySlug(
    slug: Slug,
    pageable: Pageable,
  ): Promise<Page<Publication>> {
    const publications = await this.prisma.publication.findMany({
      where: {
        blog: {
          slug: slug.value,
        },
      },
      skip: pageable.pageNumber * pageable.pageSize,
      take: pageable.pageSize,
    })

    const totalElements = await this.prisma.publication.count({
      where: {
        slug: slug.value,
      },
    })

    return Page.create<Publication>({
      content: publications.map((publication) =>
        PublicationMapper.fromPrismaToDomain(publication),
      ),
      pageNumber: pageable.pageNumber,
      pageSize: pageable.pageSize,
      totalElements,
    })
  }
}
