import { Module } from '@nestjs/common'
import { PublicationsService } from '../publications/publications.service'
import { BlogsController } from './blogs.controller'
import { BlogsService } from './blogs.service'

@Module({
  controllers: [BlogsController],
  providers: [BlogsService, PublicationsService],
})
export class BlogsModule {}
