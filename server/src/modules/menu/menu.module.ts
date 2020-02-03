import { Module, forwardRef } from "@nestjs/common";
import { MenuResolver } from "./menu.resolver";
import { MenuService } from "./menu.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Menu } from "src/entities/menu.entity";
import { UserModule } from "../user/user.module";
import { ItemModule } from "../item/item.module";

@Module({
    providers: [MenuResolver, MenuService],
    imports: [
        TypeOrmModule.forFeature([Menu]),
        forwardRef(() => UserModule),
        forwardRef(() => ItemModule)
    ],
    exports: [MenuService]
})
export class MenuModule {}
