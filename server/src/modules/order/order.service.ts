import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import * as moment from "moment";
@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly repo: Repository<Order>){}

    orders(filter?){
        if(filter)
            return this.repo.find(filter);
        return this.repo.find();
    }

    orderOfUser(user){
        return this.repo.find({user, confirmed: false});
    }

    addOrder(user: string, item: string, quantity: number, note: string){
        const order = new Order();
        order.user = user;
        order.item = item;
        order.note = note;
        order.confirmed = false;
        order.quantity = quantity;
        order.created_date = moment().format("DD/MM/YYYY");
        return this.repo.save(order);
    }


    async deleteOrder(id: string){
        const order = await this.repo.findOne(id);
        return this.repo.remove(order);
    }

    async deleteOrders(user){
        const orders = await this.repo.find({user});
        return this.repo.remove(orders);
    }

    confirmOrder(id: string){
        return new Promise(async resolve => {
            const result = await this.repo.update(id, {confirmed: true});
           if(result) resolve(true)
           else resolve(false);
        })
    }

    updateOrders(orders: Order[]){
        return this.repo.save(orders);
    }
}
