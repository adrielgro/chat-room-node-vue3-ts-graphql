import { buildSchema } from "type-graphql";
import UserModule from "./modules/user/user.module";
import RoomModule from "./modules/room/room.module";
import MessageModule from "./modules/message/message.module";

const appModule= buildSchema({
  resolvers: [
    ...UserModule.resolvers,
    ...RoomModule.resolvers,
    ...MessageModule.resolvers,
  ],
});

export default appModule;
