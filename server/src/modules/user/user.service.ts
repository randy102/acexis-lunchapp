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

    validate(token: string): Boolean{
        try{
            return <Boolean>this.jwtService.verify(token);
        }
        catch(err){ return false }
    }

    users(site: string): Promise<User[]> {
        if(site === "")
            return this.repo.find();
        else
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
            else reject("error"); 
        });
    }

    addUser(user: AddUserInput): Promise<User>{
        return this.repo.save(new User(user));
    }

    async deleteUser(id: string){
       
        return this.repo.delete(id);
    }

    async deleteUserBySite(site: string): Promise<User[]>{
        const users = await this.repo.find({site});
        return this.repo.remove(users);
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

    countUser(site: string): Promise<number>{
        return this.repo.count({site});
    }
}
