import { NonEmptyArray } from "type-graphql";
import UserResolver from "./user.resolver";

const UserModule = {
  resolvers: [UserResolver] as NonEmptyArray<Function>,
};

export default UserModule;
