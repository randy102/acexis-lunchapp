import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import { resolve } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve("../client/build"));
  await app.listen(process.env.APP);
  console.log('Server is listening on port ' + process.env.APP)
}
bootstrap();
