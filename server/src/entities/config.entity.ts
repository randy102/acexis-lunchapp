import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'

@Entity()
export class Config {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  closeOrder: string;

  @Column()
  startConfirm: string;

  @Column()
  closeConfirm: string;
}
