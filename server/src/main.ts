import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import { resolve } from 'path';
import { ConfigService } from './modules/config/config.service';
import { GqlAuthGuard } from './common/guard/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(resolve("../client/build"));
  app.enableCors();

  await app.listen(process.env.PORT);

  //Initiate Cron Job
  const configService = app.get(ConfigService);
  configService.createCron();

  console.log('Server is listening on port ' + process.env.PORT)
}
bootstrap();
