import { Module } from '@nestjs/common'
import { BlogsService } from './blogs.service'
import { BlogsController } from './blogs.controller'
import { PublicationsService } from '../publications/publications.service'

@Module({
  controllers: [BlogsController],
  providers: [BlogsService, PublicationsService],
})
export class BlogsModule {}
