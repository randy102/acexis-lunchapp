import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { ShopService } from './shop.service';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { UsePipes } from '@nestjs/common';
import { DishService } from '../dish/dish.service';

@Resolver('Shop')
@UsePipes(ToStringPipe)
export class ShopResolver {
    constructor(private readonly shopService: ShopService, private readonly dishService: DishService){}

    @Query()
    async shops(){
        return await this.shopService.shops(); 
    }

    @Mutation()
    async addShop(@Args() {name}){
        return await this.shopService.addShop(name); 
    }

    @Mutation()
    async deleteShop(@Args() {id}){
        await this.dishService.deleteDishByShop(id);
        return await this.shopService.deleteShop(id);
    }

    @Mutation()
    async updateShop(@Args() {id, name}){
        return await this.shopService.updateShop(id, name)
    }

    @ResolveProperty()
    async dishes(@Parent() {_id: shop}){
        return await this.dishService.dishes(shop);
    }
}
