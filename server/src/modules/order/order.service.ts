import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import * as moment from "moment";
@Injectable()
export class OrderService {
    constructor(@InjectRepository(Order) private readonly repo: Repository<Order>){}

    orders(){
        return this.repo.find();
    }

    orderOfUser(user, date){
        return this.repo.find({user, created_date: date});
    }

    addOrder(user: string, item: string, quantity: number, note: string): Promise<Order>{
        const order = new Order();
        order.user = user;
        order.item = item;
        order.note = note;
        order.confirmed = false;
        order.quantity = quantity;
        order.created_date = moment().format("DD/MM/YYYY");
        return this.repo.save(order);
    }

    async changeQuantity(id: string, action: -1 | 1): Promise<Order>{
        const order = await this.repo.findOne(id);
        if(action < 0)
            order.quantity--;
        else
            order.quantity++;
        return this.repo.save(order);
    }

    async deleteOrder(id: string): Promise<Order>{
        const order = await this.repo.findOne(id);
        return this.repo.remove(order);
    }
}
