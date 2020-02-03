import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigResolver } from './config.resolver';
import { Config } from 'src/entities/config.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { MenuModule } from '../menu/menu.module';

@Module({
  providers: [ConfigService, ConfigResolver],
  imports: [TypeOrmModule.forFeature([Config]), forwardRef(()=> UserModule) , forwardRef(()=>MenuModule) ],
  exports: [ConfigService]
})
export class ConfigModule {}
 