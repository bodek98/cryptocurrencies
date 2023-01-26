import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    favCoins: [],
    isCoinsSelected: false,
  },
  mutations: {
    ADD_FAVCOIN: (state, favCoin) => {
      if (state.favCoins.length < 5) {
        state.favCoins.push(favCoin);
      } else {
        console.log("too much coins!");
      }
    },
  },
  actions: {
    addFavCoin({ commit }, favCoin) {
      commit("ADD_FAVCOIN", favCoin);
    },
  },
  plugins: [createPersistedState()],
});
