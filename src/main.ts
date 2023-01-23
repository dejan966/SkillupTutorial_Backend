import { NestFactory } from '@nestjs/core'

import { AppModule } from './modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const PORT = process.env.PORT || 8080
  await app.listen(PORT)
}
bootstrap()
