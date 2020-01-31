import { Resolver, Query, Args, Mutation, ResolveProperty, Parent, Context } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { UsePipes, UseGuards } from '@nestjs/common';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { ItemService } from '../item/item.service';
import { UserService } from '../user/user.service';
import { SiteService } from '../site/site.service';
import { GqlAuthGuard } from 'src/common/guard/auth.guard';

@Resolver('Order')
@UseGuards(GqlAuthGuard)
@UsePipes(ToStringPipe)
export class OrderResolver {
    constructor(
        private readonly orderService: OrderService, 
        private readonly itemService: ItemService,
        private readonly userService: UserService,
        private readonly siteService: SiteService){}

    @Query()
    async orders() {
        return await this.orderService.orders(); 
    }

    @Query()
    async orderOfUser(@Args() {date}, @Context('user') {_id}){
        return await this.orderService.orderOfUser(_id, date);
    }

    @Mutation()
    async addOrder(@Args() {user,item,quantity, note}){        
        const result = await this.orderService.addOrder(user,item,quantity,note);
        if(result) {
            await this.itemService.increaseItem(item, parseInt(quantity));
            return true;
        }
        else return false; 
    }

    @Mutation()
    async increaseOrder(@Args() {id}){
        return await this.orderService.changeQuantity(id,1);
    }

    @Mutation()
    async decreaseOrder(@Args() {id}){
        return await this.orderService.changeQuantity(id, -1);
    }

    @Mutation()
    async deleteOrder(@Args() {id}){
        const result = await this.orderService.deleteOrder(id);
        if(result){
            await this.itemService.decreaseItem(result.item, result.quantity);
            return true;
        } 
        else return false;
    }

    @ResolveProperty()
    async user(@Parent() {user: id}){
        const user = await this.userService.user(id);
        return user.name;
    }

    @ResolveProperty()
    async site(@Parent() {user: id}){
        const user = await this.userService.user(id);
        const site = await this.siteService.site(user.site);
        return site.name;
    }

    @ResolveProperty()
    async item(@Parent() {item: id}){
        const item = await this.itemService.item(id);
        if(item)
            return item.name;
        else
            return "Item has been deleted"
    }
}
