import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { UsePipes, UseGuards } from '@nestjs/common';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { ShopService } from '../shop/shop.service';
import { PubSub } from 'graphql-subscriptions';
import { GqlAuthGuard } from 'src/common/guard/auth.guard';
import { OrderService } from '../order/order.service';
const pubSub = new PubSub();

@Resolver('Item')
@UseGuards(GqlAuthGuard)
@UsePipes(ToStringPipe)
export class ItemResolver {
    constructor(
        private readonly itemService: ItemService, 
        private readonly shopSerVice: ShopService,
        private readonly orderService: OrderService){}

    @Query()
    async items(@Args() {menu} ){
        return await this.itemService.items(menu);
    }

    @Mutation()
    async addItem(@Args() {menu, name, total}){
        const result =  await this.itemService.addItem(menu, name, parseInt(total));
        return result;
    }

    @Mutation()
    async addItemFromShop(@Args() {menu,shop,items,total}){
        const itemsToArray = JSON.parse(items);
        const shopEntity = await this.shopSerVice.shop(shop);
        await this.itemService.addItemFromShop(menu, shopEntity.name, itemsToArray, parseInt(total));
        return true;
    }

    @Mutation()
    async updateItem(@Args() {id, total, name}){
        const result = await this.itemService.updateItem(id,name,total);
        if(result){
            return true;
        } 
        return false;
    }

    @Mutation()
    async increaseItem(@Args() {id,quantity}){
        return await this.itemService.increaseItem(id,quantity);
    }

    @Mutation()
    async decreaseItem(@Args() {id,quantity}){
        return await this.itemService.decreaseItem(id,quantity);
    }

    @Mutation()
    async deleteItem(@Args() {id}){
        return await this.itemService.deleteItem(id);
    }

    
}
