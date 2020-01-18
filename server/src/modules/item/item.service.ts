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

    addItem(menu: string, dish: string, total: number): Promise<Item>{
        const item = new Item();
        item.menu = menu;
        item.dish = dish;
        item.total = total;
        item.current = 0;
        return this.repo.save(item);
    }

    async increaseItem(id: string): Promise<Item> {
        const item = await this.repo.findOne(id);
        item.current++;
        return this.repo.save(item);
    }

    async deleteItem(id: string): Promise<Item>{
        const item = await this.repo.findOne(id);
        return this.repo.remove(item);
    }
}
