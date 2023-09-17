import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
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

  async findById(id: UniqueEntityId): Promise<SearchableImage | null> {
    const image = await this.prisma.image.findFirst({
      where: {
        id: id.toString(),
      },
    })

    if (!image) {
      return null
    }

    return SearchableImageMapper.fromPrismaToDomain(image)
  }

  async findManyByIdList(idList: UniqueEntityId[]): Promise<SearchableImage[]> {
    const images = await this.prisma.image.findMany({
      where: {
        id: {
          in: idList.map((uniqueEntityId) => uniqueEntityId.toString()),
        },
      },
    })

    return images.map(SearchableImageMapper.fromPrismaToDomain)
  }
}
