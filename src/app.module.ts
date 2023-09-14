import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BlogsModule } from './app/api/blogs/blogs.module'
import { ImagesModule } from './app/api/images/images.module'
import { PublicationsModule } from './app/api/publications/publications.module'
import { AiModule } from './app/common/modules/ai.module'
import { envSchema } from './app/core/env/env'
import { EnvModule } from './app/core/env/env.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    BlogsModule,
    ImagesModule,
    PublicationsModule,
    AiModule,
    EnvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
