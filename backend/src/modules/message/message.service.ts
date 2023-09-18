import { ObjectId } from "mongodb";
import { FindOptionsWhere, Repository } from "typeorm";
import { Message } from "./entities/message";
import { CreateMessageInput } from "./dto/create-message.input";
import { MessageRepository } from "./message.repository";
import UserService from "../user/user.service";
import RoomService from "../room/room.service";
import { PubSubEngine } from "type-graphql";

class MessageService {
  private readonly messageRepository: Repository<Message>;
  private readonly userService: UserService;
  private readonly roomService: RoomService;

  constructor() {
    this.messageRepository = MessageRepository;
    this.userService = new UserService();
    this.roomService = new RoomService();
  }

  async createMessage(createMessageInput: CreateMessageInput, pubSub: PubSubEngine): Promise<Message> {
    const newMessage = this.messageRepository.create(createMessageInput);

    if (createMessageInput.userId) {
      const user = await this.userService.getUserById(createMessageInput.userId);

      if (user) {
        newMessage.user = user;
      }
    }

    if (createMessageInput.roomId) {
      const room = await this.roomService.getRoomById(createMessageInput.roomId);

      if (room) {
        newMessage.room = room;
      }
    }

    await pubSub.publish(createMessageInput.topic, newMessage);

    return await this.messageRepository.save(newMessage);
  }

  async getAllMessages(): Promise<Message[]> {
    return await this.messageRepository.find({
      relations: {
        user: true,
        room: true,
      }
    });
  }

  async getMessagesByRoom(id: string): Promise<Message[]> {
    const objectId = new ObjectId(id);

    return await this.messageRepository.find({
      where: {
        "room._id": objectId,
      } as FindOptionsWhere<Message>,
      order: {
        createdAt: "DESC",
      }
    });
  }

  async getMessageById(id: string): Promise<Message | null> {
    const objectId = new ObjectId(id);

    return await this.messageRepository.findOne({
      where: {
        _id: objectId,
      }
    });
  }
}

export default MessageService;
