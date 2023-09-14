import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // TODO: buscar a variável de ambiente do .env
  await app.listen(3333)
}
bootstrap()
