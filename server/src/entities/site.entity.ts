import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Site{
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;
}