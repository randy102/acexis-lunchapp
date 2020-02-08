import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { resolve } from 'path';
import { AppModule } from './app.module';

@Controller('/*')
export class AppController {
  @Get()
  getReactApp(@Res() res: Response) {
        return res.sendFile(resolve("./build/index.html"));
  }
}