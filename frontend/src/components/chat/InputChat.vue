<script lang="ts" setup>
import { PhPaperPlaneRight } from "@phosphor-icons/vue";
import { useStore } from "vuex";
import { ref } from "vue";

const inputValue = ref("");
const store = useStore();

const sendMessage = (message: string) => {
  if (!message.length) return;

  store.dispatch("chat/sendMessage", message);
  inputValue.value = "";
};
</script>

<template>
  <div class="input-chat">
    <input
      v-model="inputValue"
      type="text"
      placeholder="Write a message..."
      autofocus
      @keydown.enter="sendMessage(inputValue)"
    />
    <button
      @click="sendMessage(inputValue)"
    >
      <PhPaperPlaneRight size="22" />
    </button>
  </div>
</template>
