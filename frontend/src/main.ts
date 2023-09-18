import { createApp } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "./apolloClient.ts";
import initializeSession from "./store/session.ts";
import store from "./store";
import App from "./App.vue";
import "./assets/scss/main.scss";

initializeSession();

createApp(App).use(store).provide(DefaultApolloClient, apolloClient).mount("#app");
