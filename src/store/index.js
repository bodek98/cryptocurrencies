import { createStore } from "vuex";
import { ref } from "vue";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

export default createStore({
  state: {
    coins: [],
    favCoins: [],
    chartDatasets: [],
    chartLabels: [],
  },
  mutations: {
    GET_COINS: (state, coins) => {
      state.coins = coins;
    },

    ADD_DATASETS: (state, favCoinData) => {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      let time = ref([]);
      let dates = ref([]);
      time.value = favCoinData.prices.map((p) => p[0]);
      time.value.forEach((timestamp) => {
        let date = new Date(timestamp);
        dates.value.push(date.getHours());
      });
      state.chartLabels = dates.value;
      state.chartDatasets.push({
        label: favCoinData.id,
        data: favCoinData.prices,
        borderColor: "#" + randomColor,
      });
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

    async addDatasets({ commit, dispatch }, favCoin) {
      await axios
        .get(
          "https://api.coingecko.com/api/v3/coins/" +
            favCoin.id +
            "/market_chart?vs_currency=usd&days=1&interval=hourly"
        )
        .then((res) => {
          const prices = res.data.prices;
          const id = favCoin.id;
          commit("ADD_DATASETS", { prices, id });
          dispatch("addFavCoin", favCoin);
        });
    },

    addFavCoin({ commit }, favCoin) {
      commit("ADD_FAVCOIN", favCoin);
    },

    removeFavCoin({ commit }, favCoin) {
      commit("REMOVE_FAVCOIN", favCoin);
    },
  },
  plugins: [createPersistedState()],
});
