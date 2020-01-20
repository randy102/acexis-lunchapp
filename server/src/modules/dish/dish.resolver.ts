import { Resolver, Query, Context, Mutation, Args } from "@nestjs/graphql";
import { ToStringPipe } from "src/common/pipe/to-string.pipe";
import { DishService } from "./dish.service";
import { UsePipes } from "@nestjs/common";

@Resolver()
@UsePipes(ToStringPipe)
export class DishResolvers {
    constructor(private readonly dishService: DishService) {}

    @Query()
    async dishes(@Args() {shop}) {
        return await this.dishService.dishes(shop);
    }

    @Mutation()
    async addDish(@Args() {name, shop}) {
        return await this.dishService.addDish(name, shop);
    }

    @Mutation()
    async deleteDish(@Args() {id}){
        return await this.dishService.deleteDish(id);
    }

    @Mutation()
    async updateDish(@Args() {id, name}){
        return await this.dishService.updateDish(id,name);
    }
}
