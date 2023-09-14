import { PrismaService } from '@/app/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { SearchableImage } from '../../entities/searchable-image.entity'
import { SearchableImageMapper } from '../../mappers/searchable-image.mapper'
import { SearchableImageRepository } from '../searchable-image.repository'

@Injectable()
export class PrismaSearchableImageRepository
  implements SearchableImageRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(searchableImage: SearchableImage): Promise<void> {
    await this.prisma.image.create({
      data: SearchableImageMapper.fromDomainToPrisma(searchableImage),
    })
  }

  async getAll(): Promise<SearchableImage[]> {
    throw new Error('Method not implemented.')
  }
}
