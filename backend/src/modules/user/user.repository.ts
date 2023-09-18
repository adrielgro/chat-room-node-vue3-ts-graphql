import { DatabaseDataSource } from "../../app.db";
import { User } from "./entities/User";

export const UserRepository = DatabaseDataSource.getMongoRepository(User);
