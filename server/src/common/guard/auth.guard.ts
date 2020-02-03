import { Injectable, ExecutionContext, CanActivate } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserService } from "../../modules/user/user.service";
import { Reflector } from "@nestjs/core";

@Injectable()
export class GqlAuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {
        //Handle normal Request
        const normalCtx = context.switchToHttp().getRequest();
        if(normalCtx){
            if(this.userService.validate(normalCtx.headers.authorization))
                return true;
            else{
                console.log("Authorizaton Header not valid");
                return false;
            }
        }
        

        //Handle GQL Request
        const NoGuardFields = ["login","menuPublished"];
        const requiredRoles = this.reflector.get("requiredRoles",context.getHandler());
        const gqlCtx = GqlExecutionContext.create(context);
        const gqlField = gqlCtx.getInfo().fieldName;
        if (!NoGuardFields.includes(gqlField)) {

            try {
                const { authorization } = gqlCtx.getContext().request.headers;
                
                if (!authorization)
                    throw new Error("Not have Authorization Header");

                if (!this.userService.validate(authorization))
                    throw new Error("Authorizaton Header not valid");

                const user = this.userService.decode(authorization);

                if (requiredRoles && !requiredRoles.includes(user.role))
                    throw new Error("User's Role not valid");

                gqlCtx.getContext().user = user; //Save  User to Context

                return true;

            } catch (err) {
                console.log(err);
                return false;
            }
        }
        return true;
    }
}
