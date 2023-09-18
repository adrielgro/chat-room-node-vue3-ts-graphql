import { Room } from "./entities/room";
import { Repository } from "typeorm";
import { RoomRepository } from "./room.repository";

class RoomSeed {
  private readonly roomRepository: Repository<Room>;

  constructor() {
    this.roomRepository = RoomRepository;
  }

  async seed(): Promise<void> {
    const rooms = await this.roomRepository.find();

    if (rooms.length) {
      return;
    }

    const roomsData: Partial<Room>[] = [
      { title: "Artificial Intelligence", icon: "PhRobot", newChannel: false },
      { title: "Gaming", icon: "PhGameController", newChannel: true },
      { title: "Music", icon: "PhMusicNotes", newChannel: false },
      { title: "Work Team", icon: "PhBriefcase", newChannel: false },
    ];

    for (const data of roomsData) {
      const newRoom = this.roomRepository.create(data);
      await this.roomRepository.save(newRoom);
    }
  }
}

export default RoomSeed;

