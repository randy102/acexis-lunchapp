import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, UsePipes } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guard/auth.guard';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { ConfigService } from './config.service';


@Resolver('Config')
//@UseGuards(GqlAuthGuard)
@UsePipes(ToStringPipe)
export class ConfigResolver {
    constructor(
        private readonly configService: ConfigService){}

    @Query()
    async config(){
        return await this.configService.getConfig()
    }

    @Mutation()
    async updateConfig(@Args() { order, closeConfirm, startConfirm }){
        return await this.configService.updateConfig(order,closeConfirm, startConfirm);
    }
}
