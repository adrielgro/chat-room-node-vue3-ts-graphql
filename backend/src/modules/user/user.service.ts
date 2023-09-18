import { Repository } from "typeorm";
import { ObjectId } from "mongodb";
import { User } from "./entities/User";
import { UserRepository } from "./user.repository";
import { CreateUserInput } from "./dto/create-user.input";

class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = UserRepository;
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);

    return await this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User | null> {
    const objectId = new ObjectId(id);

    return await this.userRepository.findOne({
      where: {
        _id: objectId,
      }
    });
  }
}

export default UserService;
