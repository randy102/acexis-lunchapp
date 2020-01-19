import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from 'src/entities/site.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SiteService {
    constructor(@InjectRepository(Site) private readonly repo: Repository<Site>){}

    sites(): Promise<Site[]>{
        return this.repo.find();
    }

    site(id): Promise<Site>{
        return this.repo.findOne(id);
    }

    addSite(name: string): Promise<Site>{
        const site = new Site();
        site.name = name;
        return this.repo.save(site);
    }

    async deleteSite(id: string): Promise<Site>{
        const site = await this.repo.findOne(id);
        return this.repo.remove(site);
    }

    async updateSite(id: string, name: string): Promise<Site>{
        const site = await this.repo.findOne(id);
        site.name = name;
        return this.repo.save(site);
    }
}
