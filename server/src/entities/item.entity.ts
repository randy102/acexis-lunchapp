import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Item{
    @ObjectIdColumn()
    _id: ObjectID;
    
    @Column()
    dish: string;

    @Column()
    menu: string;

    @Column()
    total: number;

    @Column()
    current: number;
}