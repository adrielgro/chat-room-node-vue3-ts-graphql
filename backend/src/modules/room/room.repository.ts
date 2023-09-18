import { DatabaseDataSource } from "../../app.db";
import { Room } from "./entities/room";

export const RoomRepository = DatabaseDataSource.getMongoRepository(Room);
