import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UserService } from './user.service';
import { UsePipes, UseGuards } from '@nestjs/common';
import { ToStringPipe } from 'src/common/pipe/to-string.pipe';
import { AddUserInput } from 'src/graphql.schema';
import { GqlAuthGuard } from 'src/common/guard/auth.guard';

@Resolver('User')
@UsePipes(ToStringPipe)
@UseGuards(GqlAuthGuard)
export class UserResolver {
    constructor(private readonly userService: UserService){}

    @Query()
    async users(@Args() {site}){
        return await this.userService.users(site);
    }

    @Query()
    async login(@Args() {name, password}){
        return await this.userService.login(name,password);
    }

    @Mutation()
    async addUser(@Args('user') user: AddUserInput){
        return await this.userService.addUser(user);
    }

    @Mutation()
    async deleteUser(@Args() {id}){
        return await this.userService.deleteUser(id);
    }

    @Mutation()
    async updateUser(@Args() {id, data}){
        return await this.userService.updateUser(id,data);
    }
}
