import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShopService } from './shop.service';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { UsePipes } from '@nestjs/common';

@Resolver('Shop')
@UsePipes(ToStringPipe)
export class ShopResolver {
    constructor(private readonly shopService: ShopService){}

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
        return await this.shopService.deleteShop(id);
    }
}
