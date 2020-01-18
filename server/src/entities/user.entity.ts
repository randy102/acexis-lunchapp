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
    role: userRole;

    @Column()
    status: userStatus;

    @Column()
    site: string;

    constructor(user?: Partial<AddUserInput>){
        if(user) Object.assign(this, user);
    }
}

export enum userRole{
    ADMIN="ADMIN",
    MOD="MOD",
    APP_USER="APP_USER"
}

export enum userStatus{
    ACTIVE="ACTIVE",
    BLOCKED="BLOCKED"
}