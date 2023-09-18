<script lang="ts" setup>
import InputChat from "./InputChat.vue";
import DropdownMenu from "../ui/DropdownMenu.vue";
import { User } from "../../types/User.ts";
import { computed, ComputedRef, watch } from "vue";
import { useStore } from "vuex";
import { Room } from "../../types/Room.ts";
import { Message } from "../../types/Message.ts";
import DynamicIcon from "../utils/DynamicIcon.vue";
import moment from "moment";
import tailwindColors from "tailwindcss/colors";

const store = useStore();
const logout = () => store.dispatch("auth/logout");
const user: ComputedRef<User> = computed(() => store.getters["auth/currentUser"]);
const currentRoom: ComputedRef<Room> = computed(() => store.getters["chat/currentRoom"]);
const allMessages: ComputedRef<Message[]> = computed(() => store.getters["chat/getMessages"]);
const isMyMessage = (message: Message) => message.user._id === user.value._id;
const userColors: Map<string, string> = new Map();

const getRandomColor = () => {
  const tailwindColorArray = Object.keys(tailwindColors);
  const randomIndex = Math.floor(Math.random() * (tailwindColorArray.length - 10)) + 5;

  return tailwindColorArray[randomIndex];
};

const getUserColor = (userId: string) => {
  if (!userColors.has(userId)) {
    const newColor = `text-${getRandomColor()}-500`;
    userColors.set(userId, newColor);

    return newColor;
  }

  return userColors.get(userId);
};

watch(currentRoom, (room: Room) => {
  store.dispatch("chat/startMessageSubscription", room._id);
}, { immediate: true });
</script>

<template>
  <div class="bg-white rounded-2xl flex flex-col flex-1 border-l border-l-gray-100 w-6/12">
    <div class="border-b border-b-gray-100 py-4 px-4 lg:px-12 flex justify-between items-center">
      <div class="flex items-center gap-x-5">
        <div class="w-[52px] overflow-hidden">
          <DynamicIcon
            :icon-name="currentRoom.icon"
            size="48"
            weight="duotone"
          />
        </div>
        <p class="text-sm lg:text-lg text-slate-900 font-medium">
          {{ currentRoom.title }}
        </p>
      </div>
      <div class="flex items-center gap-x-8">
        <input
          type="text"
          class="input-search hidden lg:block"
          placeholder="Search within the chat..."
        />
        <DropdownMenu :text="user.username">
          <button
            role="menuitem"
            tabindex="-1"
          >
            Change username
          </button>
          <button
            role="menuitem"
            tabindex="-1"
            @click="logout"
          >
            Sign out
          </button>
        </DropdownMenu>
      </div>
    </div>
    <div class="flex flex-col flex-1 justify-between bg-chat bg-[#EFEAE2]">
      <div
        class="flex flex-col-reverse gap-y-5 px-4 lg:px-12 py-8 overflow-y-auto"
        :style="{ height: 'calc(100vh - 219px)' }"
      >
        <div
          v-for="(message, key) in allMessages"
          :key="key"
          :class="[isMyMessage(message) ? 'self-end' : 'self-start', 'w-full lg:w-7/12 flex flex-col']"
        >
          <div
            :class="[
              isMyMessage(message) ? 'self-end bg-primary text-white rounded-br-none'
              : 'self-start bg-white rounded-bl-none',
              'rounded-3xl py-3 px-4 text-sm break-all'
            ]"
          >
            <p
              v-if="!isMyMessage(message)"
              :class="['font-semibold text-xs', getUserColor(message.user._id)]"
            >
              {{ message.user.username }}
            </p>
            <p>{{ message.text }}</p>
          </div>

          <span :class="[isMyMessage(message) ? 'self-end' : 'self-start', 'text-[10px] text-gray-600 mt-2']">
            {{ moment(new Date(message.createdAt)).format('LT') }}
          </span>
        </div>
      </div>
      <InputChat />
    </div>
  </div>
</template>

<style lang="scss">
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 12px;

    &:hover {
      background: #555;
    }
  }
</style>
