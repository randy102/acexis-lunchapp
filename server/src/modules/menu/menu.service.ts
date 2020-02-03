import { Injectable, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/entities/menu.entity';
import { Repository } from 'typeorm';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import {AddMenuInput, MenuStatus} from "../../graphql.schema";
import * as moment from "moment";

@Injectable()
@UsePipes(ToStringPipe)
export class MenuService {
    constructor(@InjectRepository(Menu) private readonly repo: Repository<Menu>){}

    menus(site: string): Promise<Menu[]>{
        return this.repo.find({site});
    }

    menu(id: string){
        return this.repo.findOne(id);
    }

    userMenu(site){
        return this.repo.findOne({site, status: MenuStatus.PUBLISHED});
    }

    addMenu(menu: AddMenuInput): Promise<Menu>{
        const me = new Menu(menu);
        me.created_date = moment().format("DD/MM/YYYY");
        return this.repo.save(me);
    }

    async updateMenu(id: string, status: MenuStatus, name: string){
        return this.repo.update(id, {status,name});
    }

    async deleteMenu(id: string){
        return this.repo.delete(id);
    }

    async closeMenu(){
        const publishedMenu = await this.repo.find({status: MenuStatus.PUBLISHED});
        for(let menu of publishedMenu){
            menu.status = MenuStatus.CLOSED;
        }
        return await this.repo.save(publishedMenu);
    }
}
