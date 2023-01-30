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
      console.log("GET_FAVCOIN_PRICES");
      // console.log(state.favCoinPrices);
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
      // console.log(state.favCoins);
      console.log(state.favCoins.length);
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
    async getFavCoinPrices({ commit }, favCoin) {
      await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/" +
            favCoin.id +
            "/market_chart?vs_currency=usd&days=1&interval=hourly"
        )
        .then((res) => {
          commit("GET_FAVCOIN_PRICES", res.data.prices);
          console.log("getFavCoinPrices from store");
          commit("ADD_FAVCOIN", favCoin);
        });
    },
    addFavCoin({ dispatch }, favCoin) {
      dispatch("getFavCoinPrices", favCoin);
      console.log("add from store");
    },
    removeFavCoin({ commit }, favCoin, favCoinId) {
      commit("REMOVE_FAVCOIN", favCoin, favCoinId);
    },
  },
  plugins: [createPersistedState()],
});
