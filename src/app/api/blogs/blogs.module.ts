import { AiBlogPrimaryColorGeneratorAdapter } from '@/app/common/services/ai/ai-blog-primary-color-generator.adapter'
import { VercelAiSdkAiBlogPrimaryColorGeneratorService } from '@/app/common/services/ai/implementations/vercel-ai-sdk-ai-blog-primary-color-generator.service'
import { Module } from '@nestjs/common'
import { PublicationsModule } from '../publications/publications.module'
import { PublicationsService } from '../publications/publications.service'
import { BlogsController } from './blogs.controller'
import { BlogsService } from './blogs.service'
import { BlogsRepository } from './repositories/blogs.repository'
import { InMemoryBlogsRepository } from './repositories/implementations/in-memory-blogs.repository'

@Module({
  imports: [PublicationsModule],
  controllers: [BlogsController],
  providers: [
    BlogsService,
    PublicationsService,
    {
      provide: BlogsRepository,
      useClass: InMemoryBlogsRepository,
    },
    {
      provide: AiBlogPrimaryColorGeneratorAdapter,
      useClass: VercelAiSdkAiBlogPrimaryColorGeneratorService,
    },
  ],
})
export class BlogsModule {}
