import { Controller, Get } from '@nestjs/common'
import { PublicationsService } from './publications.service'

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Get()
  async getAll() {
    return this.publicationsService.getAll()
  }
}
