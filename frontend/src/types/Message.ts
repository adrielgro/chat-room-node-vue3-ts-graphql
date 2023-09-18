import { User } from "./User.ts";

export interface Message {
  _id?: string;
  text: string;
  createdAt: Date;
  user: User;
}

export interface MessagesByRoomResponse {
  getMessagesByRoom: Message[];
}

export interface CreateMessageResponse {
  createMessage: Message;
}

export interface NewMessageResponse {
  newMessage: Message;
}
