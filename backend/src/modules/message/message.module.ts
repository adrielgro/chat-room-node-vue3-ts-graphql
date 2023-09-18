import { NonEmptyArray } from "type-graphql";
import MessageResolver from "./message.resolver";

const MessageModule = {
  resolvers: [MessageResolver] as NonEmptyArray<Function>,
};

export default MessageModule;
