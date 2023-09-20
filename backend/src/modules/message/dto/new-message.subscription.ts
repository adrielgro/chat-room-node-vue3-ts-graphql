import { Field, ObjectType } from "type-graphql";
import { Message } from "../entities/message";
import { User } from "../../user/entities/User";

@ObjectType()
export class NewMessageSubscription implements Partial<Message> {
  @Field({ nullable: true })
  public text?: string;

  @Field(() => [String], { nullable: true })
  public files!: string[];

  @Field(() => Boolean, { nullable: true })
  public isMedia!: boolean;

  @Field()
  public createdAt!: Date;

  @Field(() => User)
  public user!: User;
}
