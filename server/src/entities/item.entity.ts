import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Item{
    @ObjectIdColumn()
    _id: ObjectID;
    
    @Column()
    shop: string;

    @Column()
    name: string;

    @Column()
    menu: string;

    @Column()
    total: number;

    @Column()
    booked: number;
}