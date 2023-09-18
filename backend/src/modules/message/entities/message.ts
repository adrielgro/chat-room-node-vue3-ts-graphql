import {
  Column,
  CreateDateColumn,
  Entity, ObjectId, ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Room } from "../../room/entities/room";
import { User } from "../../user/entities/User";

@ObjectType()
@Entity()
export class Message {
  @Field(() => ID, { nullable: true })
  @ObjectIdColumn()
  public readonly _id?: ObjectId;

  @Field()
  @Column()
  public text!: string;

  @Field({ nullable: true })
  @CreateDateColumn()
  public createdAt!: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field(() => User, { nullable: true })
  @Column(() => User)
  public user!: User;

  @Field(() => Room, { nullable: true })
  @Column(() => Room)
  public room!: Room;
}
