import { Resolver, Args, Query, Mutation, Context, Subscription } from '@nestjs/graphql';
import { MenuService } from './menu.service';
import { UsePipes, UseGuards} from '@nestjs/common';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { GqlAuthGuard } from 'src/common/guard/auth.guard';
import { UserService } from '../user/user.service';
import { ItemService } from '../item/item.service';
import { PubSub } from 'graphql-subscriptions';
import { MenuStatus } from 'src/graphql.schema';
import { Menu } from 'src/entities/menu.entity';
const pubSub = new PubSub();

@Resolver('Menu')
@UseGuards(GqlAuthGuard)
@UsePipes(ToStringPipe)
export class MenuResolver {
    constructor(
        private readonly menuService: MenuService, 
        private readonly userService: UserService,
        private readonly itemService: ItemService){}

    @Query()
    async menus(@Args() {site}){
        const menu = await this.menuService.menus(site);
        return menu.sort((a,b) =>  (a['id'] > b['id'] ? 1 : -1));
    }

    @Query()
    async userMenu(@Context('user') {_id}){
        const user = await this.userService.user(_id);
        const menu =  await this.menuService.userMenu(user['site']);
        if(menu){
            const items = await this.itemService.items(String(menu['_id']));
            return items; 
        }
        else 
            return [];
    }

    @Mutation()
    async addMenu(@Args() {name, site, status} ){
        return await this.menuService.addMenu({name, site, status});
    }

    @Mutation()
    async updateMenu(@Args() {id, status, name}){
        if(status === MenuStatus.PUBLISHED){
            const menu = await this.menuService.menu(id);
            pubSub.publish(`menuPublishedAtSite-${menu.site}`,{menuPublished: menu});
        }
        return await this.menuService.updateMenu(id,status,name);
    }

    @Mutation()
    async deleteMenu(@Args() {id}){
        return await this.menuService.deleteMenu(id);
    }

    @Subscription('menuPublished', {
        filter: (payload,varible,context) => {
            console.log({payload,varible,context})
            return true;
        }
    })
    menuPublished(@Args() {site}){
        return pubSub.asyncIterator(`menuPublishedAtSite-${site}`);
    }   
}
