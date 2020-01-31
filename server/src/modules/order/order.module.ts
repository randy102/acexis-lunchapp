import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { ItemModule } from '../item/item.module';
import { UserModule } from '../user/user.module';
import { SiteModule } from '../site/site.module';

@Module({
  providers: [OrderResolver, OrderService],
  imports: [TypeOrmModule.forFeature([Order]), ItemModule, UserModule, SiteModule]
})
export class OrderModule {}
