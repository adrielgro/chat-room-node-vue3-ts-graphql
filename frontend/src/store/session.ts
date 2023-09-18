import store from ".";

const initializeSession = () => {
  const currentSession = localStorage.getItem("user");

  if (currentSession) {
    store.commit("auth/SET_USER", JSON.parse(currentSession));
  }
};

export default initializeSession;
