import { Resolver, Query, Args, Mutation, ResolveProperty, Parent, Context } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { UsePipes, UseGuards } from '@nestjs/common';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { ItemService } from '../item/item.service';
import { UserService } from '../user/user.service';
import { SiteService } from '../site/site.service';
import { GqlAuthGuard } from 'src/common/guard/auth.guard';
import { UserRole, MenuStatus, UserStatus } from 'src/graphql.schema';
import { MenuService } from '../menu/menu.service';
import { ConfigService } from '../config/config.service';
import moment = require('moment');

@Resolver('Order')
@UseGuards(GqlAuthGuard)
@UsePipes(ToStringPipe)
export class OrderResolver {
    constructor(
        private readonly orderService: OrderService, 
        private readonly itemService: ItemService,
        private readonly userService: UserService,
        private readonly siteService: SiteService,
        private readonly menuService: MenuService,
        private readonly configService: ConfigService){}

    @Query()
    async orders() {
        return await this.orderService.orders(); 
    }

    @Query()
    async orderOfUser(@Context('user') {_id}){
        return await this.orderService.orderOfUser(_id);
    }

    @Mutation()
    async addOrderUser(@Context('user') {_id}, @Args() {item,quantity, note}){
        const itemEntity = await this.itemService.item(item);
        const menuEntity = await this.menuService.menu(itemEntity.menu);
        const userEntity = await this.userService.user(_id);
        const config = await this.configService.getConfig();
        const endOrder = moment(config.closeOrder, "HH:mm");

        if(userEntity.status === UserStatus.BLOCKED)
            return {error: "Your account is Blocked! Please contact Admin for detail"}
        if(userEntity.role === UserRole.USER && menuEntity.status !== MenuStatus.PUBLISHED)
            return {error: "Menu is unavailable! Please try again in a few minutes"}
        if(moment().isSameOrAfter(endOrder))
            return {error: "Menu is closed. Can not order!"}

        const result = await this.orderService.addOrder(_id,item,quantity,note);

        if(result) 
            await this.itemService.increaseItem(item, parseInt(quantity));
           
        return {success: "Success"}; 
    }

    @Mutation()
    async addOrder(@Args() {user,item,quantity, note}){
        const result = await this.orderService.addOrder(user,item,quantity,note);

        if(result) {
            await this.itemService.increaseItem(item, parseInt(quantity));
            return true;
        }
        
        return false;
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

    @Mutation()
    async confirmOrder(@Args() {id}){
        const config = await this.configService.getConfig();
        const startConfirm = moment(config.startConfirm, "HH:mm");
        const endConfirm = moment(config.closeConfirm, "HH:mm");

        if(moment().isSameOrAfter(startConfirm) && moment().isBefore(endConfirm)){
            await this.orderService.confirmOrder(id);
            return {success: "Confirm successfuly!"}
        }
        else{
            return {error: `Not able to confirm now! Please back at ${config.startConfirm}`}
        }

    }

    @ResolveProperty()
    async user(@Parent() {user: id}){
        const user = await this.userService.user(id);
        if(user) return user.name;
        return ""
    }

    @ResolveProperty()
    async site(@Parent() {user: id}){
        const user = await this.userService.user(id);
        if(user){
            const site = await this.siteService.site(user.site);
            return site.name;
        }
        return "";
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
