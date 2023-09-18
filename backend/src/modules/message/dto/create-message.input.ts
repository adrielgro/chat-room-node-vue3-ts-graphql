import { Field, InputType } from "type-graphql";
import { Message } from "../entities/message";

@InputType()
export class CreateMessageInput implements Partial<Message> {
  @Field()
  public text!: string;

  @Field()
  public topic!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String)
  public roomId!: string;
}
