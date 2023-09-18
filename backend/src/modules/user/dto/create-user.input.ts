import { Field, InputType } from "type-graphql";
import { User } from "../entities/User";

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  public username!: string;
}
