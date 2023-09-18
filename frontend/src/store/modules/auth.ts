import { ActionContext, Module } from "vuex";
import { CreateUserResponse, User } from "../../types/User";
import { RootState } from "..";
import { CREATE_USER } from "../../graphql/user/mutations.ts";
import apolloClient from "../../apolloClient.ts";

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const getters = {
  isAuthenticated(state: AuthState) {
    return !!state.user;
  },
  currentUser(state: AuthState): User | null {
    return state.user;
  },
};

const mutations = {
  SET_USER(state: AuthState, user: User) {
    state.user = user;
  },
  LOGOUT(state: AuthState) {
    state.user = null;
  },
};

const actions = {
  async login({ commit }: ActionContext<AuthState, RootState>, username: string) {
    try {
      const { data } = await apolloClient.mutate<CreateUserResponse>({
        mutation: CREATE_USER,
        variables: { createUserInput: { username } },
      });

      if (data?.createUser) {
        commit("SET_USER", data?.createUser);
        localStorage.setItem("user", JSON.stringify(data?.createUser));
      }
    } catch (error) {
      console.error(error);
    }
  },
  logout({ commit, dispatch }: ActionContext<AuthState, RootState>) {
    localStorage.clear();
    dispatch("chat/stopMessageSubscription", null, { root: true });
    commit("chat/SET_ROOM", null, { root: true });
    commit("chat/CLEAR_MESSAGES", null, { root: true });
    commit("LOGOUT");
  },
};

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters,
};
