import { ActionContext, Module } from "vuex";
import apolloClient from "../../apolloClient.ts";
import { RootState } from "..";
import { GET_ROOM, GET_ROOMS } from "../../graphql/room/queries.ts";
import { Room, RoomResponse, RoomsResponse } from "../../types/Room.ts";
import { NEW_MESSAGE } from "../../graphql/message/subscriptions.ts";
import { Message, NewMessageResponse, CreateMessageResponse, MessagesByRoomResponse } from "../../types/Message.ts";
import { CREATE_MESSAGE, UPLOAD_FILES } from "../../graphql/message/mutations.ts";
import { Subscription } from "zen-observable-ts";
import { GET_MESSAGES_BY_ROOM } from "../../graphql/message/queries.ts";

export interface ChatState {
  room: Room | null;
  rooms: Room[];
  roomSubscription: Subscription | null;
  messages: Message[];
}

const initialState: ChatState = {
  room: null,
  rooms: [],
  messages: [],
  roomSubscription: null,
};

const getters = {
  currentRoom(state: ChatState): Room | null {
    return state.room;
  },
  allRooms: (state: ChatState) => state.rooms,
  getMessages: (state: ChatState) => state.messages,
};

const mutations = {
  SET_ROOM(state: ChatState, room: Room) {
    state.room = room;
  },
  SET_ROOMS(state: ChatState, rooms: Room[]) {
    state.rooms = rooms;
  },
  SET_MESSAGES(state: ChatState, messages: Message[]) {
    state.messages = messages;
  },
  ADD_MESSAGE(state: ChatState, newMessage: Message) {
    state.messages.unshift(newMessage);
  },
  CLEAR_MESSAGES(state: ChatState) {
    state.messages = [];
  }
};

const actions = {
  async loadRooms({ commit }: ActionContext<ChatState, RootState>) {
    try {
      const { data } = await apolloClient.query<RoomsResponse>({
        query: GET_ROOMS,
      });

      if (data?.getAllRooms) {
        commit("SET_ROOMS", data?.getAllRooms);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async selectRoom({ commit, dispatch }: ActionContext<ChatState, RootState>, roomId: string) {
    try {
      const { data } = await apolloClient.query<RoomResponse>({
        query: GET_ROOM,
        variables: { getRoomId: roomId },
      });

      if (data?.getRoom) {
        commit("CLEAR_MESSAGES");
        commit("SET_ROOM", data?.getRoom);

        await dispatch("loadMessages", roomId);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async loadMessages({ commit }: ActionContext<ChatState, RootState>, roomId: string) {
    try {
      const { data } = await apolloClient.mutate<MessagesByRoomResponse>({
        mutation: GET_MESSAGES_BY_ROOM,
        variables: {
          getMessagesByRoomId: roomId,
        },
      });

      commit("SET_MESSAGES", data?.getMessagesByRoom);
    } catch (error) {
      console.error(error);
    }
  },
  async sendMessage({ state, rootState }: ActionContext<ChatState, RootState>, message: string) {
    try {
      await apolloClient.mutate<CreateMessageResponse>({
        mutation: CREATE_MESSAGE,
        variables: {
          createMessageInput: {
            text: message,
            roomId: state.room?._id,
            userId: rootState.auth.user?._id,
            topic: rootState.chat.room?._id,
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  async sendFile({ state, rootState }: ActionContext<ChatState, RootState>, files: File[]) {
    try {
      await apolloClient.mutate<CreateMessageResponse>({
        mutation: UPLOAD_FILES,
        variables: {
          uploadFileInput: {
            files: files,
            isMedia: false,
            roomId: state.room?._id,
            userId: rootState.auth.user?._id,
            topic: rootState.chat.room?._id,
          },
        },
        context: {
          headers: {
            "keep-alive": "true",
            "Apollo-Require-Preflight": "true"
          },
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  async sendImage({ state, rootState }: ActionContext<ChatState, RootState>, files: File[]) {
    try {
      await apolloClient.mutate<CreateMessageResponse>({
        mutation: UPLOAD_FILES,
        variables: {
          uploadFileInput: {
            files: files,
            isMedia: true,
            roomId: state.room?._id,
            userId: rootState.auth.user?._id,
            topic: rootState.chat.room?._id,
          },
        },
        context: {
          headers: {
            "keep-alive": "true",
            "Apollo-Require-Preflight": "true"
          },
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  async startMessageSubscription({ state, commit, dispatch }: ActionContext<ChatState, RootState>, topic: string) {
    await dispatch("stopMessageSubscription");

    const observable = apolloClient.subscribe({
      query: NEW_MESSAGE,
      variables: { topic }
    });

    state.roomSubscription = observable.subscribe({
      next({ data }: { data: NewMessageResponse }) {
        commit("ADD_MESSAGE", data.newMessage);
      },
      error(err) {
        console.error("Error en la suscripción:", err);
      },
    });
  },
  async stopMessageSubscription({ state }: ActionContext<ChatState, RootState>) {
    if (state.roomSubscription) {
      state.roomSubscription.unsubscribe();
    }
  },
};

export const chat: Module<ChatState, RootState> = {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters,
};
