import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { UsePipes, SetMetadata } from '@nestjs/common';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { ArgsMetaData } from 'src/common/decorator/argument.decorator';

@Resolver('Order')
@UsePipes(ToStringPipe)
export class OrderResolver {
    constructor(private readonly orderService: OrderService){}

    @Query()
    async orders(@Args() {filter} ) {
        return await this.orderService.orders(filter); 
    }

    @Mutation()
    async addOrder(@Args() {user,item, quantity}){
        return await this.orderService.addOrder(user,item,quantity);
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
        return await this.orderService.deleteOrder(id);
    }
}
