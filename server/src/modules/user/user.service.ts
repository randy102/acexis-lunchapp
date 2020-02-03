import { Injectable, UsePipes } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserStatus } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";
import { AddUserInput } from "../../graphql.schema";
import { JwtService } from "@nestjs/jwt";
import { OrderService } from "../order/order.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly orderService: OrderService
    ) {}

    decode(token: string): User {
        const decode = this.jwtService.decode(token);
        return <User>decode;
    }

    validate(token: string): Boolean {
        try {
            return <Boolean>this.jwtService.verify(token);
        } catch (err) {
            return false;
        }
    }

    users(site: string): Promise<User[]> {
        if (site === "") return this.repo.find();
        else return this.repo.find({ site });
    }

    user(id: string) {
        return this.repo.findOne(id);
    }

    login(name: string, password: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const user = await this.repo.find({ name, password });

            //If user not found or password not match
            if (user.length > 0) {
                const token = this.jwtService.sign(JSON.stringify(user[0]));
                resolve(token);
            } else reject("error");
        });
    }

    changePassword(id: string, old: string, password: string) {
        return new Promise(async (resolve, reject) => {
            const user = await this.repo.findOne(id);
            if (user.password !== old) reject({ error: "Password is wrong!" });
            else {
                user.password = password;
                await this.repo.save(user);
                resolve({ success: "Password has been changed!" });
            }
        });
    }

    addUser(user: AddUserInput): Promise<User> {
        return this.repo.save(new User(user));
    }

    async deleteUser(id: string) {
        return this.repo.delete(id);
    }

    async deleteUserBySite(site: string): Promise<User[]> {
        const users = await this.repo.find({ site });
        return this.repo.remove(users);
    }

    async updateUser(id: string, data: string): Promise<User> {
        const user = await this.repo.findOne(id);
        if (data !== "") {
            const dataObj = JSON.parse(data);
            for (let field in dataObj) {
                user[field] = dataObj[field];
            }
            return this.repo.save(user);
        } else return user;
    }

    countUser(site: string): Promise<number> {
        return this.repo.count({ site });
    }

    async blockUser() {
        //Find Orders that not confirmed
        const unConfirmed = await this.orderService.orders({confirmed: false});
        const userSet = new Set<string>();

        for (let order of unConfirmed) {
            userSet.add(order.user); //Add user id to set
            order.confirmed = true; //Set order confirmed to True
        }

        //Convert String to ObjectID
        const userArray = Array.from<string>(userSet);
        const userIds = userArray.map(id => new ObjectId(id));

        //Get users from db
        const users = await this.repo.find({
            where: {
                _id: { $in: userIds }
            }
        });

        //Block user
        for(let user of users){
            user.status = UserStatus.BLOCKED;
        }
        this.orderService.updateOrders(unConfirmed);
        return await this.repo.save(users);
    }
}
