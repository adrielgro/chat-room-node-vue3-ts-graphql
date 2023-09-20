<script lang="ts" setup>
  import { PhHouse } from "@phosphor-icons/vue";
  import { useStore } from "vuex";
  import { computed, ComputedRef, onMounted } from "vue";
  import DynamicIcon from "../utils/DynamicIcon.vue";
  import { Room } from "../../types/Room.ts";

  const store = useStore();
  const selectRoom = (id: string) => store.dispatch("chat/selectRoom", id);
  const loadRooms = () => store.dispatch("chat/loadRooms");
  const allRooms = computed(() => store.getters["chat/allRooms"]);
  const currentRoom: ComputedRef<Room> = computed(() => store.getters["chat/currentRoom"]);

  onMounted(() => {
    loadRooms();
  });
</script>

<template>
  <header class="sidebar">
    <div>
      <div class="logo">
        <div>
          <img
            src="/logo.png"
            alt="Sellia"
          />
        </div>
      </div>

      <div class="chat-rooms">
        <p>
          CHAT ROOMS
        </p>
        <ul>
          <li
            v-for="(room, key) in allRooms"
            :key="key"
            :class="{ 'text-primary bg-primary-light': currentRoom?._id === room._id }"
            @click="selectRoom(room._id)"
          >
            <DynamicIcon
              :icon-name="room.icon"
              weight="duotone"
            />
            <span>{{ room.title }}</span>
            <span v-if="room.newChannel">
              New!
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <p>Sellia Chat Rooms</p>
      <p>© 2024 All Rights Reserved</p>
    </div>
  </header>
</template>
