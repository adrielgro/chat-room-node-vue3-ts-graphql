import {
  Column,
  CreateDateColumn,
  Entity, ObjectId, ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Room {
  @Field(() => ID)
  @ObjectIdColumn()
  public readonly _id?: ObjectId;

  @Field()
  @Column({ type: "varchar" })
  public title!: string;

  @Field()
  @Column({ type: "varchar" })
  public icon!: string;

  @Field()
  @Column({ type: Boolean, default: false })
  public newChannel!: boolean;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
