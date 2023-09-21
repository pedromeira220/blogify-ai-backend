import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './app/core/env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const envService = app.get(EnvService)

  app.enableCors()

  const PORT = envService.get('PORT')

  console.log('> app PORT: ', PORT)

  await app.listen(PORT)
}
bootstrap()
