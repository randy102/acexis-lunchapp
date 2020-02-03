import { Resolver, Query, Args, Mutation, Context, ResolveProperty, Parent } from '@nestjs/graphql'
import { UserService } from './user.service';
import { UsePipes, UseGuards, SetMetadata } from '@nestjs/common';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { AddUserInput } from 'src/graphql.schema';
import { GqlAuthGuard } from 'src/common/guard/auth.guard';
import { SiteService } from '../site/site.service';
import { OrderService } from '../order/order.service';

@Resolver('User')
@UsePipes(ToStringPipe)
@UseGuards(GqlAuthGuard)
export class UserResolver {
    constructor(
        private readonly userService: UserService, 
        private readonly siteService: SiteService, 
        private readonly orderService: OrderService){}

    
    @Query()
    @SetMetadata("requiredRoles", ['ADMIN'])
    async users(@Args() {site}){
        return await this.userService.users(site);
    }

    
    @Query()
    async login(@Args() {name, password}){
        return await this.userService.login(name,password);
    }

    @Mutation()
    @SetMetadata("requiredRoles", ['ADMIN'])
    async addUser(@Args('user') user: AddUserInput){
        return await this.userService.addUser(user);
    }

    @Mutation()
    @SetMetadata("requiredRoles", ['ADMIN'])
    async deleteUser(@Args() {id}){
        await this.orderService.deleteOrders(id);
        return await this.userService.deleteUser(id);
    }

    @Mutation()
    @SetMetadata("requiredRoles", ['ADMIN'])
    async updateUser(@Args() {id, data}){
        return await this.userService.updateUser(id,data);
    }

    @Mutation()
    async changePassword(@Args() {old, password}, @Context('user') {_id}){
        return await this.userService.changePassword(_id,old,password);
    }

    @ResolveProperty()
    async site(@Parent() {site: id}){
        return await this.siteService.site(id);
    }
}
