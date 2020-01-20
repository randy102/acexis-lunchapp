import { Module } from "@nestjs/common";
import { DishResolvers } from "./dish.resolver";
import { DishService } from "./dish.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dish } from "src/entities/dish.entity";

@Module({
    providers: [DishResolvers, DishService],
    imports: [TypeOrmModule.forFeature([Dish])],
    exports: [DishService]
})
export class DishModule {}
