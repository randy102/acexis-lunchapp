import { Module } from '@nestjs/common';
import { MenuResolver } from './menu.resolver';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/entities/menu.entity';

@Module({
  providers: [MenuResolver, MenuService],
  imports: [TypeOrmModule.forFeature([Menu])]
})
export class MenuModule {}
