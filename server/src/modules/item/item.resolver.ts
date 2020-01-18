import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { UsePipes } from '@nestjs/common';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';

@Resolver('Item')
@UsePipes(ToStringPipe)
export class ItemResolver {
    constructor(private readonly itemService: ItemService){}

    @Query()
    async items(@Args() {menu} ){
        return await this.itemService.items(menu);
    }

    @Mutation()
    async addItem(@Args() {menu, dish, total}){
        return await this.itemService.addItem(menu,dish,total)
    }

    @Mutation()
    async increaseItem(@Args() {id}){
        return await this.itemService.increaseItem(id);
    }

    @Mutation()
    async deleteItem(@Args() {id}){
        return await this.itemService.deleteItem(id);
    }
}
