import { Module } from '@nestjs/common';
import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop.entity';
import { DishModule } from '../dish/dish.module';

@Module({
  providers: [ShopResolver, ShopService],
  imports: [TypeOrmModule.forFeature([Shop]), DishModule]
})
export class ShopModule {}
