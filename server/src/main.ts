import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP);
  console.log('Server is listening on port ' + process.env.APP)
}
bootstrap();
