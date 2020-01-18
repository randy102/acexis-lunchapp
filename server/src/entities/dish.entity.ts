import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'

@Entity({
  name: 'dishes'
})
export class Dish {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  shop: string;
}
