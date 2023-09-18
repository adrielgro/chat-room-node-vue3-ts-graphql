import { Field, InputType } from "type-graphql";
import { Room } from "../entities/room";

@InputType()
export class CreateRoomInput implements Partial<Room> {
  @Field()
  public title!: string;

  @Field()
  public icon!: string;

  @Field()
  public newChannel!: boolean;
}
