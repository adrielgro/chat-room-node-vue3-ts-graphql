import { DataSource } from "typeorm";
import { User } from "./modules/user/entities/User";
import { Room } from "./modules/room/entities/room";
import { Message } from "./modules/message/entities/message";

export const DatabaseDataSource = new DataSource({
  type: "mongodb",
  host: "mongodb",
  port: 27017,
  username: "sellia",
  password: "12345678",
  database: "sellia_chat",
  authSource: "admin",
  synchronize: true,
  logging: true,
  entities: [User, Room, Message],
  subscribers: [],
  migrations: [],
});
