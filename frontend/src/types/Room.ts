export interface Room {
  _id: string;
  title: string;
  icon: string;
  newChannel: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoomResponse {
  getRoom: Room;
}

export interface RoomsResponse {
  getAllRooms: Room[];
}
