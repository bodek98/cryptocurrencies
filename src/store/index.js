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

    MANAGE_NEWFAVCOIN: (state, favCoinData) => {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      let time = ref([]);
      let dates = ref([]);
      time.value = favCoinData.prices.map((p) => p[0]);
      time.value.forEach((timestamp) => {
        let date = new Date(timestamp);
        dates.value.push(date.getHours());
      });
      state.chartLabels = dates.value;
      if (state.favCoins.length < 5) {
        state.chartDatasets.push({
          label: favCoinData.favCoin.name,
          data: favCoinData.prices,
          borderColor: "#" + randomColor,
          backgroundColor: "#" + randomColor,
        });
      }
    },

    REMOVE_CHARTDATA: (state, favCoin) => {
      const objWithIdIndex = state.favCoins.findIndex(
        (obj) => obj.id === favCoin.id
      );
      state.chartDatasets.splice(objWithIdIndex, 1);
    },

    ADD_FAVCOIN: (state, favCoin) => {
      if (state.favCoins.length < 5) {
        state.favCoins.push(favCoin);
        document.getElementById(favCoin.id + "-row").classList.add("selected");
      } else {
        console.log("too much coins!");
      }
    },

    REMOVE_FAVCOIN: (state, favCoin) => {
      const objWithIdIndex = state.favCoins.findIndex(
        (obj) => obj.id === favCoin.id
      );
      state.favCoins.splice(objWithIdIndex, 1);
      document.getElementById(favCoin.id + "-row").classList.remove("selected");
    },

    CLEAR_FAVCOIN_DATA: (state) => {
      // object = []; is not enough as it breakes v-fors based on the object
      // splice for whole length of an array is needed
      state.chartDatasets.splice(0, state.chartDatasets.length);
      state.favCoins.splice(0, state.favCoins.length);
    },
  },
  actions: {
    async getCoins({ commit, dispatch }) {
      try {
        await axios
          .get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h"
          )
          .then((res) => {
            commit("GET_COINS", res.data);
            const blockSelectedCoins = () => {
              this.state.favCoins.forEach((element) => {
                document
                  .getElementById(element.id + "-row")
                  .classList.add("selected");
              });
            };
            blockSelectedCoins();
          });
      } catch (error) {
        dispatch("handleError", error);
      }
    },

    async manageNewFavCoin({ commit, dispatch }, favCoin) {
      try {
        await axios
          .get(
            "https://api.coingecko.com/api/v3/coins/" +
              favCoin.id +
              "/market_chart?vs_currency=usd&days=1&interval=hourly"
          )
          .then((res) => {
            const prices = res.data.prices;
            for (let i = 0; i < this.state.favCoins.length; i++) {
              if (this.state.favCoins[i].id === favCoin.id) return;
            }
            commit("MANAGE_NEWFAVCOIN", { prices, favCoin });
            dispatch("addFavCoin", favCoin);
          });
      } catch (error) {
        dispatch("handleError", error);
      }
    },

    async removeChartData({ commit, dispatch }, favCoin) {
      commit("REMOVE_CHARTDATA", favCoin);
      dispatch("removeFavCoin", favCoin);
    },

    addFavCoin({ commit }, favCoin) {
      commit("ADD_FAVCOIN", favCoin);
    },

    removeFavCoin({ commit }, favCoin) {
      commit("REMOVE_FAVCOIN", favCoin);
    },

    updateFavCoins({ commit, dispatch }) {
      let coinString = "";
      this.state.favCoins.forEach((favCoin) => {
        coinString += favCoin.id + ",";
      });
      if (coinString.length == 0) return;

      commit("CLEAR_FAVCOIN_DATA");
      dispatch("getAllFavCoinsData", coinString);
    },

    async getAllFavCoinsData({ dispatch }, coinString) {
      const tableElement = document.getElementById("fav-coin-table");
      tableElement.classList.add("loading");

      try {
        await axios
          .get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" +
              coinString.toString() +
              "&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h"
          )
          .then((res) => {
            res.data.forEach((coin) => {
              dispatch("manageNewFavCoin", coin);
            });
          });
      } catch (error) {
        dispatch("handleError", error);
      }

      tableElement.classList.remove("loading");
    },

    handleError(error) {
      const errorElement = document.getElementById("cors-error");

      errorElement.classList.add("active");
      setTimeout(() => {
        errorElement.classList.remove("active");
      }, 5000);

      console.log(error);
    },
  },
  plugins: [createPersistedState()],
});
