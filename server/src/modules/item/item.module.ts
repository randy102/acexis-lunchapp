import { Module, forwardRef } from "@nestjs/common";
import { ItemResolver } from "./item.resolver";
import { ItemService } from "./item.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "src/entities/item.entity";
import { ItemController } from "./item.controller";
import { ShopModule } from "../shop/shop.module";
import { UserModule } from "../user/user.module";
import { OrderModule } from "../order/order.module";

@Module({
    providers: [ItemResolver, ItemService, ItemController],
    imports: [
        TypeOrmModule.forFeature([Item]),
        ShopModule,
        forwardRef(() => UserModule),
        forwardRef(() => OrderModule)
    ],
    exports: [ItemController, ItemService]
})
export class ItemModule {}
