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
}
