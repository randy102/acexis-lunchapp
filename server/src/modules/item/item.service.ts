import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "src/entities/item.entity";
import { Repository } from "typeorm";

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item) private readonly repo: Repository<Item>
    ) {}

    items(menu: string): Promise<Item[]> { 
        return this.repo.find({ menu });
    }

    item(id: string){
        return this.repo.findOne(id);
    }

    addItem(menu: string, name: string ,total: number): Promise<Item>{
        const item = new Item();
        item.menu = menu;
        item.name = name;
        item.shop = "";
        item.total = total;
        item.booked = 0;
        item.cancelled = 0;
        return this.repo.save(item);
    }

    addItemFromShop(menu: string, shop: string, itemInputs: [ItemFromShopInput], total: number){
        let items = [];
        for(let input of itemInputs){
            let temp = new Item();
            temp.menu = menu;
            temp.shop = shop;
            temp.name = input.name;
            temp.total = total;
            temp.booked = 0;
            temp.cancelled = 0;
            items.push(temp);
        }
        return this.repo.save(items);
    }

    addItemFromExcel(menu: string,itemInputs: any[]){
        let items = [];
        for(let input of itemInputs){
            let temp = new Item();
            temp.menu = menu;
            temp.shop = "";
            temp.name = input.name;
            temp.total = input.total;
            temp.booked = 0;
            temp.cancelled = 0;
            items.push(temp);
        }
        return this.repo.save(items);
    }

    async increaseItem(id: string, quantity: number){
        const item = await this.repo.findOne(id);
        item.booked += quantity;
        return this.repo.save(item);
    }

    async decreaseItem(id: string, quantity: number){
        const item = await this.repo.findOne(id);
        item.booked -= quantity;
        item.cancelled += quantity;
        return this.repo.save(item);
    }

    updateItem(id: string,  name: string, total: number){
        return this.repo.update(id,{name,total});
    }

    deleteItem(id: string){

        return this.repo.delete(id);
    }
}


interface ItemFromShopInput{
    _id: string
    name: string,
}