import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Shop{
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;
}