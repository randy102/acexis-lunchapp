import { Injectable, ExecutionContext, CanActivate } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserService } from "../../modules/user/user.service";
import { Reflector } from "@nestjs/core";

@Injectable()
export class GqlAuthGuard implements CanActivate {
    constructor(private readonly userService: UserService, private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        const NoGuardFields = ["login"];
        const requiredRoles: Array<string> = this.reflector.get('requiredRoles', context.getHandler());
    
        try {
            const gqlCtx = GqlExecutionContext.create(context);
            const { authorization } = gqlCtx.getContext().request.headers;
            const gqlField = gqlCtx.getInfo().fieldName;

            if (!NoGuardFields.includes(gqlField)){

                if(!authorization ) 
                    throw new Error("Not have Authorization Header"); 

                if(!this.userService.validate(authorization))
                    throw new Error("Authorizaton Header not valid");

                const user =  this.userService.decode(authorization); 

                if(requiredRoles && !requiredRoles.includes(user.role))
                    throw new Error("User's Role not valid");
                
                gqlCtx.getContext().user = user; //Save  User to Context

            }

            return true;

        } 
        catch (err) {
            console.log(err);
            return false;
        }
    }
}
