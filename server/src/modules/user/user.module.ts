import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    providers: [UserService, UserResolver],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({ secret: "12345" })
    ],
    exports: [UserService]
})
export class UserModule {}
