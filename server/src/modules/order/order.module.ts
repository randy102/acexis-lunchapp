import { Module, forwardRef } from "@nestjs/common";
import { OrderResolver } from "./order.resolver";
import { OrderService } from "./order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entities/order.entity";
import { ItemModule } from "../item/item.module";
import { UserModule } from "../user/user.module";
import { SiteModule } from "../site/site.module";
import { MenuModule } from "../menu/menu.module";
import { ConfigModule } from "../config/config.module";

@Module({
    providers: [OrderResolver, OrderService],
    exports: [OrderService],
    imports: [
        TypeOrmModule.forFeature([Order]),
        forwardRef(()=> ItemModule),
        forwardRef(() => UserModule),
        forwardRef(() => SiteModule),
        forwardRef(()=> MenuModule),
        forwardRef(()=> ConfigModule)
    ]
})
export class OrderModule {}
