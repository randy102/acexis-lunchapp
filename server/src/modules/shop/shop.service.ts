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

    async deleteShop(id: string): Promise<Shop> {
        const shop = await this.repo.findOne(id);
        return this.repo.remove(shop);
    }
}
