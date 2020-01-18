import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { AddMenuInput } from "src/graphql.schema";

@Entity()
export class Menu{
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column()
    site: string;

    @Column()
    status: MenuStatus;

    @Column()
    created_date: string;

    constructor(menu?: Partial<AddMenuInput>){
        if(menu)
            Object.assign(this, menu);
    }
}

export enum MenuStatus{
    UNPUBLISHED="UNPUBLISHED",
    PUBLISHED="PUBLISHED",
    CLOSED="CLOSED",
    BLOCKED="BLOCKED"
}