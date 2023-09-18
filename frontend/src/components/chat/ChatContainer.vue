<script lang="ts" setup>
  import { computed } from "vue";
  import store from "../../store";
  import ConversationChat from "./ConversationChat.vue";
  import SplashChat from "./SplashChat.vue";

  const chatSelected = computed(() => store.getters["chat/currentRoom"]);
</script>

<template>
  <main class="flex h-main-screen overflow-hidden">
    <div class="flex-1 flex max-w-full">
      <ConversationChat v-if="chatSelected" />
      <SplashChat v-else />
    </div>
  </main>
</template>
