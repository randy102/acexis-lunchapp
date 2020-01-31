import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { UsePipes} from '@nestjs/common';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { AddMenuInput } from 'src/graphql.schema';

@Resolver('Menu')
@UsePipes(ToStringPipe)
export class MenuResolver {
    constructor(private readonly menuService: MenuService){}

    @Query()
    async menus(@Args() {site}){
        const menu = await this.menuService.menus(site);
        return menu.sort((a,b) =>  (a['id'] > b['id'] ? 1 : -1));
    }

    @Mutation()
    async addMenu(@Args() {name, site, status} ){
        return await this.menuService.addMenu({name, site, status});
    }

    @Mutation()
    async updateMenu(@Args() {id, status, name}){
        return await this.menuService.updateMenu(id,status,name);
    }

    @Mutation()
    async deleteMenu(@Args() {id}){
        return await this.menuService.deleteMenu(id);
    }
}
