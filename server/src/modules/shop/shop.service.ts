import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shop } from "src/entities/shop.entity";
import { Repository } from "typeorm";

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(Shop) private readonly repo: Repository<Shop>
    ) {}

    shops(): Promise<Shop[]> {
        return this.repo.find();
    }

    shop(id: string): Promise<Shop> {
        return this.repo.findOne(id);
    }

    addShop(name: string): Promise<Shop> {
        const shop = new Shop();
        shop.name = name;
        return this.repo.save(shop);
    }

    async updateShop(id: string, name:string){
        return this.repo.update(id, {name});
    }

    async deleteShop(id: string) {
        return this.repo.delete(id);
    }
}
