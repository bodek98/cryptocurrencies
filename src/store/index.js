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
        console.log(favCoin);
      } else {
        console.log("too much coins!");
      }
    },
    REMOVE_FAVCOIN: (state, favCoinId) => {
      const objWithIdIndex = state.favCoins.findIndex(
        (obj) => obj.id === favCoinId
      );
      state.favCoins.splice(objWithIdIndex, 1);
    },
  },
  actions: {
    addFavCoin({ commit }, favCoin) {
      commit("ADD_FAVCOIN", favCoin);
    },
    removeFavCoin({ commit }, favCoinId) {
      commit("REMOVE_FAVCOIN", favCoinId);
    },
  },
  plugins: [createPersistedState()],
});
