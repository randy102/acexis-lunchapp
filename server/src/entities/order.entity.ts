import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Order{
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    user: string;

    @Column()
    item: string;

    @Column()
    quantity: number;

    @Column()
    created_date: string;
}