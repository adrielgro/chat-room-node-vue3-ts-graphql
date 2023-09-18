import { DatabaseDataSource } from "../../app.db";
import { Message } from "./entities/message";

export const MessageRepository = DatabaseDataSource.getMongoRepository(Message);
