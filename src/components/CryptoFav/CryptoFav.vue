<template>
  <h3 class="title">Favourite coins</h3>
  <div id="fav-coin-table" class="table">
    <div class="loading-screen">
      <div class="loading-screen__ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <table class="table__data">
      <!-- table head -->
      <thead>
        <tr class="table__headRow">
          <th class="table__coin table__coin--small table__coin--alignCenter">
            #
          </th>
          <th class="table__coin table__coin--small table__coin--alignCenter">
            Rank
          </th>
          <th class="table__coin table__coin--alignCenter">Coin</th>
          <th class="table__coin">Current Price</th>
          <th class="table__coin">1h%</th>
          <th class="table__coin">Volume</th>
          <th class="table__coin">Market Cap</th>
        </tr>
      </thead>
      <!-- table data -->
      <tr
        v-for="coin in favCoins"
        :key="coin.name"
        class="table__row"
        @click="removeFavCoin(coin)"
      >
        <td class="table__coin--small table__coin--alignCenter">
          <span>
            <font-awesome-icon icon="fa-regular fa-trash-can" />
          </span>
        </td>
        <td class="table__coin table__coin--small table__coin--alignCenter">
          {{ coin.market_cap_rank }}
        </td>
        <td class="table__coin table__coin--data">
          <img class="table__coin--logo" :src="coin.image" alt="coin logo" />
          <p>{{ coin.name }}</p>
          <p class="table__coin--symbol">{{ coin.symbol }}</p>
        </td>
        <td class="table__coin">${{ coin.current_price }}</td>
        <td class="table__coin">{{ coin.price_change_percentage_24h }}%</td>
        <td class="table__coin">${{ coin.total_volume }}</td>
        <td class="table__coin">${{ coin.market_cap }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    let favCoins = ref(store.state.favCoins);

    const removeFavCoin = (coin) => {
      return store.dispatch("removeChartData", coin);
    };

    return {
      favCoins,
      removeFavCoin,
    };
  },
};
</script>

<style src="./CryptoFav.scss" lang="scss"></style>
