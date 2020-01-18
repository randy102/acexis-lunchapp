import { Module } from '@nestjs/common';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/entities/item.entity';

@Module({
  providers: [ItemResolver, ItemService],
  imports: [TypeOrmModule.forFeature([Item])]
})
export class ItemModule {}
