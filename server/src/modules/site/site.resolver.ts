import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SiteService } from './site.service';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { UsePipes } from '@nestjs/common';

@Resolver('Site')
@UsePipes(ToStringPipe)
export class SiteResolver {
    constructor(private readonly siteService: SiteService){}

    @Query()
    async sites(){
        return await this.siteService.sites();
    }

    @Mutation()
    async addSite(@Args() {name}){
        return await this.siteService.addSite(name);
    }

    @Mutation()
    async deleteSite(@Args() {id}){
        return await this.siteService.deleteSite(id);
    }

    @Mutation()
    async updateSite(@Args() {id, name}){
        return await this.siteService.updateSite(id,name);
    }
}
