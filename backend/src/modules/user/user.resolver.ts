import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./entities/User";
import UserService from "./user.service";

@Resolver(User)
class UserResolver {
  private userService: UserService = new UserService();

  @Mutation(() => User)
  async createUser(@Arg("createUserInput") createUserInput: CreateUserInput): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg("id") id: string): Promise<User | null> {
    return await this.userService.getUserById(id);
  }
}

export default UserResolver;
