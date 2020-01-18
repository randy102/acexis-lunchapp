import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { DishModule } from './modules/dish/dish.module'
import { GraphQLModule } from '@nestjs/graphql'
import { UserModule } from './modules/user/user.module'
import { join } from 'path'
import { SiteModule } from './modules/site/site.module';
import { OrderModule } from './modules/order/order.module';
import { MenuModule } from './modules/menu/menu.module';
import { ItemModule } from './modules/item/item.module';
import { ShopModule } from './modules/shop/shop.module'
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb+srv://randy:12345@randy-dkqal.gcp.mongodb.net/lun?retryWrites=true&w=majority", 
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ request: req })
    }), 
    
    UserModule, SiteModule, MenuModule, OrderModule, DishModule, ItemModule, ShopModule],
  
  controllers: [],
  
  providers: [],
})
export class AppModule { }
