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
        return await this.menuService.menus(site);
    }

    @Mutation()
    async addMenu(@Args('menu') menu: AddMenuInput){
        return await this.menuService.addMenu(menu);
    }

    @Mutation()
    async updateMenu(@Args() {id, status, site}){
        return await this.menuService.updateMenu(id,status,site);
    }

    @Mutation()
    async deleteMenu(@Args() {id}){
        return await this.menuService.deleteMenu(id);
    }
}
