<script lang="ts" setup>
  import { computed } from "vue";
  import store from "./store";
  import SidebarMenu from "./components/layout/SidebarMenu.vue";
  import ChatContainer from "./components/chat/ChatContainer.vue";
  import LoginAuth from "./components/auth/LoginAuth.vue";

  const isAuth = computed(() => store.getters["auth/isAuthenticated"]);
</script>

<template>
  <div class="py-4 lg:py-5 px-4 lg:px-8 h-screen">
    <div class="flex relative">
      <div
        v-if="!isAuth"
        class="absolute z-20 w-full h-full flex items-center justify-center"
      >
        <LoginAuth />
      </div>
      <div :class="[{ 'blur-sm': !isAuth } , 'flex w-full']">
        <div
          v-if="!isAuth"
          class="absolute w-full h-full bg-white/50 z-10 rounded-2xl"
        />
        <SidebarMenu />
        <div class="container-chat">
          <div class="overflow-y-auto scroll-smooth">
            <ChatContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
