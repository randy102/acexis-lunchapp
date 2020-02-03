import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
import { AddUserInput } from "src/graphql.schema";

@Entity()
export class User{
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    role: UserRole;

    @Column()
    status: UserStatus;

    @Column()
    site: string;

    constructor(user?: Partial<AddUserInput>){
        if(user) Object.assign(this, user);
    }
}

export enum UserRole{
    ADMIN="ADMIN",
    MOD="MOD",
    USER="USER"
}

export enum UserStatus{
    ACTIVE="ACTIVE",
    BLOCKED="BLOCKED"
}