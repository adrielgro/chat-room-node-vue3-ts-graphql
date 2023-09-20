import { ObjectId } from "mongodb";
import { FindOptionsWhere, Repository } from "typeorm";
import { Message } from "./entities/message";
import { CreateMessageInput } from "./dto/create-message.input";
import { MessageRepository } from "./message.repository";
import UserService from "../user/user.service";
import RoomService from "../room/room.service";
import { PubSubEngine } from "type-graphql";
import { UploadFileInput } from "./dto/upload-file.input";
import { createWriteStream } from "fs";
import { generateFileName } from "./helpers/upload-file.helper";

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

  async uploadFiles(uploadFileInput: UploadFileInput, pubSub: PubSubEngine) {
    let images: string[] = [];

    try {
      images = await Promise.all(
        uploadFileInput.files.map(async (file) => {
          const { createReadStream, filename } = await file;
          const readStream = createReadStream();
          const newFilename = generateFileName(filename);
          const writeStream = createWriteStream(
            `./public/static/${newFilename}`,
          );

          await new Promise<void>((resolve, reject) => {
            readStream
              .pipe(writeStream)
              .on("finish", resolve)
              .on("error", (error) => reject(error));
          });

          return newFilename;
        }),
      );
    } catch (e) {
      console.error("Error saving file:", e);
    }

    const newMessage = this.messageRepository.create({
      ...uploadFileInput,
      files: [],
    });

    if (uploadFileInput.userId) {
      const user = await this.userService.getUserById(uploadFileInput.userId);

      if (user) {
        newMessage.user = user;
      }
    }

    if (uploadFileInput.roomId) {
      const room = await this.roomService.getRoomById(uploadFileInput.roomId);

      if (room) {
        newMessage.room = room;
      }
    }

    newMessage.files = images;

    await pubSub.publish(uploadFileInput.topic, {
      ...newMessage,
      files: images,
    });

    return await this.messageRepository.save(newMessage);
  }
}

export default MessageService;
