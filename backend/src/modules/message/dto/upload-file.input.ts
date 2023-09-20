import { Field, InputType, ObjectType } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@ObjectType()
@InputType()
export class UploadFileInput {
  @Field(() => [GraphQLUpload])
  public files!: [FileUpload];

  @Field()
  public isMedia!: boolean;

  @Field({ nullable: true })
  public text?: string;

  @Field()
  public topic!: string;

  @Field(() => String)
  public userId!: string;

  @Field(() => String)
  public roomId!: string;
}
