import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Dish } from "src/entities/dish.entity";
import { Repository } from "typeorm";

@Injectable()
export class DishService{
    constructor(@InjectRepository(Dish) private readonly repo: Repository<Dish>){}

    dishes(shop: string): Promise<Dish[]>{
        return this.repo.find({shop});
    }

    addDish(name: string, shop: string): Promise<Dish>{
        const dish = new Dish();
        dish.name = name;
        dish.shop = shop;
        return this.repo.save(dish);
    }

    async deleteDish(id: string): Promise<Dish>{
        const dish = await this.repo.findOne(id);
        return this.repo.remove(dish);
    }
}