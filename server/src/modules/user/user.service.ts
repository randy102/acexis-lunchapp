import { Injectable, UsePipes } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { ToStringPipe } from "src/common/pipe/to-string.pipe";
import {AddUserInput} from "../../graphql.schema"
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    decode(token: string): User{
        const decode = this.jwtService.decode(token)
        return <User>decode;
    }

    users(site: string): Promise<User[]> {
        return this.repo.find({ site });
    }

    login(name: string, password: string): Promise<string> {
        return new Promise(async (resolve, reject) => {

            const user = await this.repo.find({ name, password });
            
            //If user not found or password not match
            if (user.length > 0) { 
                const token = this.jwtService.sign(JSON.stringify(user[0]));
                resolve(token);
            }
            else reject("Login fail!");
        });
    }

    addUser(user: AddUserInput): Promise<User>{
        const u = new User(user);
        return this.repo.save(u);
    }

    async deleteUser(id: string): Promise<User>{
        const user = await this.repo.findOne(id);
        return this.repo.remove(user);
    }

    async updateUser(id: string, data: string): Promise<User>{
        const user = await this.repo.findOne(id);
        if(data !== ""){
            const dataObj = JSON.parse(data);
            for(let field in dataObj){
                user[field] = dataObj[field];
            }
            return this.repo.save(user);
        }
        else return user;
    }
}
