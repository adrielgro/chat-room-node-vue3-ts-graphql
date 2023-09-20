import { DataSource } from "typeorm";
import { User } from "./modules/user/entities/User";
import { Room } from "./modules/room/entities/room";
import { Message } from "./modules/message/entities/message";

export const DatabaseDataSource = new DataSource({
  type: "mongodb",
  host: process.env.MONGO_HOSTNAME,
  port: 27017,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  database: process.env.MONGO_DATABASE,
  authSource: "admin",
  synchronize: true,
  logging: true,
  entities: [User, Room, Message],
  subscribers: [],
  migrations: [],
});
