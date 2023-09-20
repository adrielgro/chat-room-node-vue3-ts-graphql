<script lang="ts" setup>
import { PhImages, PhPaperclip, PhPaperPlaneRight } from "@phosphor-icons/vue";
import { useStore } from "vuex";
import { ref } from "vue";

const inputValue = ref("");
const inputFileRef = ref<HTMLInputElement | null>(null);
const inputMediaRef = ref<HTMLInputElement | null>(null);
const store = useStore();

const sendMessage = (message: string) => {
  if (!message.length) return;

  store.dispatch("chat/sendMessage", message);
  inputValue.value = "";
};

const sendFile = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.files && inputElement.files.length > 0) {
    const selectedFile = inputElement.files[0];

    store.dispatch("chat/sendFile", [selectedFile]);
    resetFileInputs();
  }
};

const sendImage = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.files && inputElement.files.length > 0) {
    const selectedFile = inputElement.files[0];

    store.dispatch("chat/sendImage", [selectedFile]);
    resetFileInputs();
  }
};

const resetFileInputs = () => {
  const inputFile = inputFileRef.value;
  const inputMedia = inputMediaRef.value;

  if (inputFile) {
    inputFile.value = "";
  }

  if (inputMedia) {
    inputMedia.value = "";
  }
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
    <div>
      <div class="attachments">
        <label for="file"><PhPaperclip size="20" /></label>
        <input
          id="file"
          ref="inputFileRef"
          type="file"
          @change="sendFile"
        />
        <label for="image"><PhImages size="20" /></label>
        <input
          id="image"
          ref="inputMediaRef"
          type="file"
          accept="image/*"
          @change="sendImage"
        />
      </div>
      <button @click="sendMessage(inputValue)">
        <PhPaperPlaneRight size="22" />
      </button>
    </div>
  </div>
</template>
