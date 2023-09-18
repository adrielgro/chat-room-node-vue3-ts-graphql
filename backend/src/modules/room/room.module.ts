import { NonEmptyArray } from "type-graphql";
import RoomResolver from "./room.resolver";

const RoomModule = {
  resolvers: [RoomResolver] as NonEmptyArray<Function>,
};

export default RoomModule;
