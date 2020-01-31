import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { UsePipes } from '@nestjs/common';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { ShopService } from '../shop/shop.service';

@Resolver('Item')
@UsePipes(ToStringPipe)
export class ItemResolver {
    constructor(private readonly itemService: ItemService, private readonly shopSerVice: ShopService){}

    @Query()
    async items(@Args() {menu} ){
        return await this.itemService.items(menu);
    }

    @Mutation()
    async addItem(@Args() {menu, name, total}){
        return await this.itemService.addItem(menu, name, parseInt(total))
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
        if(result) return true;
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
