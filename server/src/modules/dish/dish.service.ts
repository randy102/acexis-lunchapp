import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Dish } from "src/entities/dish.entity";
import { Repository } from "typeorm";

@Injectable()
export class DishService {
    constructor(
        @InjectRepository(Dish) private readonly repo: Repository<Dish>
    ) {}

    dishes(shop: string): Promise<Dish[]> {
        return this.repo.find({ shop });
    }

    addDish(name: string, shop: string): Promise<Dish> {
        const dish = new Dish();
        dish.name = name;
        dish.shop = shop;
        return this.repo.save(dish);
    }

    deleteDish(id: string) {
        return this.repo.delete(id);
    }

    async deleteDishByShop(shop: string){
        const dishes = await this.repo.find({shop});
        return this.repo.remove(dishes);
    }

    updateDish(id: string, name: string): Promise<any>{
        return  this.repo.update(id,{name});
    }

    countDish(shop: string): Promise<number> {
        return this.repo.count({ shop });
    }

    
}
