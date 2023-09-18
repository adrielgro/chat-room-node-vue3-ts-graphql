import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CreateRoomInput } from "./dto/create-room.input";
import roomService from "./room.service";
import { Room } from "./entities/room";
import RoomService from "./room.service";

@Resolver(Room)
class RoomResolver {
  private roomService: RoomService = new roomService();

  @Mutation(() => Room)
  async createRoom(@Arg("createRoomInput") createRoomInput: CreateRoomInput): Promise<Room> {
    return await this.roomService.createRoom(createRoomInput);
  }

  @Query(() => [Room])
  async getAllRooms(): Promise<Room[]> {
    return await this.roomService.getAllRooms();
  }

  @Query(() => Room, { nullable: true })
  async getRoom(@Arg("id") id: string): Promise<Room | null> {
    return await this.roomService.getRoomById(id);
  }
}

export default RoomResolver;
