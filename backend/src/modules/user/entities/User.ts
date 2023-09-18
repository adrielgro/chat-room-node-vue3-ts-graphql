import {
  Column,
  CreateDateColumn,
  Entity, ObjectId, ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  public readonly _id?: ObjectId;

  @Field()
  @Column({ type: "varchar" })
  public username!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
