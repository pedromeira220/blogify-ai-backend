import { Module } from '@nestjs/common'
import { PublicationsService } from './publications.service'
import { PublicationsController } from './publications.controller'
import { InMemoryPublicationsRepository } from './repositories/implementations/in-memory-publications.repository'
import { PublicationsRepository } from './repositories/publications.repository'

@Module({
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    {
      provide: PublicationsRepository,
      useClass: InMemoryPublicationsRepository,
    },
  ],
  exports: [PublicationsService],
})
export class PublicationsModule {}
