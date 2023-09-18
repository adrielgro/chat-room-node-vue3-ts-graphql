import { Repository } from "typeorm";
import { ObjectId } from "mongodb";
import { Room } from "./entities/room";
import { RoomRepository } from "./room.repository";
import { CreateRoomInput } from "./dto/create-room.input";

class RoomService {
  private readonly roomRepository: Repository<Room>;

  constructor() {
    this.roomRepository = RoomRepository;
  }

  async createRoom(createRoomInput: CreateRoomInput): Promise<Room> {
    const newRoom = this.roomRepository.create(createRoomInput);

    return await this.roomRepository.save(newRoom);
  }

  async getAllRooms(): Promise<Room[]> {
    return await this.roomRepository.find({
      order: {
        title: "ASC",
      }
    });
  }

  async getRoomById(id: string): Promise<Room | null> {
    const objectId = new ObjectId(id);

    return await this.roomRepository.findOne({
      where: {
        _id: objectId,
      }
    });
  }
}

export default RoomService;
