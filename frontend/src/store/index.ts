import { createStore } from "vuex";
import { auth, AuthState } from "./modules/auth.ts";
import { chat, ChatState } from "./modules/chat.ts";

export interface RootState {
  auth: AuthState;
  chat: ChatState;
}

export default createStore<RootState>({
  modules: {
    auth,
    chat,
  },
});
