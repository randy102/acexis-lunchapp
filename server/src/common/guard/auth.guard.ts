import { Injectable, ExecutionContext, CanActivate } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserService } from "../../modules/user/user.service";

@Injectable()
export class GqlAuthGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext) {
        try {
            const gqlCtx = GqlExecutionContext.create(context);
            const { authorization } = gqlCtx.getContext().request.headers;
            gqlCtx.getContext().user = this.userService.decode(authorization);
        } catch (err) {
            return false;
        }
        return true;
    }
}
