import { AiPostGeneratorAdapter } from '@/app/common/services/ai/ai-post-generator.adapter'
import { VercelAiSdkAiPostGeneratorService } from '@/app/common/services/ai/implementations/vercel-ai-sdk-ai-post-generator.service'
import { Module } from '@nestjs/common'
import { ImagesModule } from '../images/images.module'
import { ImagesService } from '../images/images.service'
import { PublicationsController } from './publications.controller'
import { PublicationsService } from './publications.service'
import { InMemoryPublicationsRepository } from './repositories/implementations/in-memory-publications.repository'
import { PublicationsRepository } from './repositories/publications.repository'

@Module({
  imports: [ImagesModule],
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    {
      provide: PublicationsRepository,
      useClass: InMemoryPublicationsRepository,
    },
    ImagesService,
    {
      provide: AiPostGeneratorAdapter,
      useClass: VercelAiSdkAiPostGeneratorService,
    },
  ],
  exports: [
    PublicationsService,
    PublicationsRepository,
    ImagesModule,
    AiPostGeneratorAdapter,
  ],
})
export class PublicationsModule {}
