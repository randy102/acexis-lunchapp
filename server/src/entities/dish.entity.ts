import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'

@Entity()
export class Dish {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  shop: string;
}
