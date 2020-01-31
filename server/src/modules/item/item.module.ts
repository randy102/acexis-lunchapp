import { Module } from '@nestjs/common';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';
import { ItemController } from './item.controller';
import { ShopModule } from '../shop/shop.module';

@Module({
  providers: [ItemResolver, ItemService, ItemController],
  imports: [TypeOrmModule.forFeature([Item]), ShopModule],
  exports: [ItemController, ItemService]
})
export class ItemModule {}
