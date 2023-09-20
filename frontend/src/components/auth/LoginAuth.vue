<script lang="ts" setup>
  import { useStore } from "vuex";
  import { ref } from "vue";

  const username = ref("");
  const store = useStore();

  const login = () => {
    if (!username.value.length) return;

    store.dispatch("auth/login", username.value);
  };
</script>

<template>
  <div class="modal-auth">
    <p class="title">
      Hello, join us 🖐️
    </p>
    <p class="message">
      To enter our chat rooms, please enter your username below:
    </p>
    <input
      v-model="username"
      placeholder="Enter your username..."
    />
    <button @click="login">
      Join and enjoy
    </button>
  </div>
</template>
