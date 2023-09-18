import { Field, ObjectType } from "type-graphql";
import { Message } from "../entities/message";
import { User } from "../../user/entities/User";

@ObjectType()
export class NewMessageSubscription implements Partial<Message> {
  @Field()
  public text!: string;

  @Field()
  public createdAt!: Date;

  @Field(() => User)
  public user!: User;
}
