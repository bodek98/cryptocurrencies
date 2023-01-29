import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

export default createStore({
  state: {
    coins: [],
    favCoins: [],
    favCoinPrices: [],
  },
  mutations: {
    GET_COINS: (state, coins) => {
      state.coins = coins;
    },
    GET_FAVCOIN_PRICES: (state, coins) => {
      state.favCoinPrices = coins;
      console.log(state.favCoinPrices);
    },
    ADD_FAVCOIN: (state, favCoin) => {
      if (state.favCoins.length < 5) {
        state.favCoins.push(favCoin);
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
    async getCoins({ commit }) {
      try {
        await axios
          .get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h"
          )
          .then((res) => {
            commit("GET_COINS", res.data);
          });
      } catch (error) {
        console.log(error);
      }
    },

    async addFavCoin({ commit }, favCoin) {
      await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/" +
            favCoin.id +
            "/market_chart?vs_currency=usd&days=1&interval=hourly"
        )
        .then((res) => {
          commit("GET_FAVCOIN_PRICES", res.data.prices);
        });
      commit("ADD_FAVCOIN", favCoin);
      console.log(favCoin.id);
    },
    removeFavCoin({ commit }, favCoinId) {
      commit("REMOVE_FAVCOIN", favCoinId);
    },
  },
  plugins: [createPersistedState()],
});
