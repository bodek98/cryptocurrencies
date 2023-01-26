<template>
  <div class="table">
    <table class="table__data">
      <!-- table head -->
      <thead>
        <tr class="table__row">
          <th class="table__coin--small">Rank</th>
          <th class="table__coin">Coin</th>
          <th class="table__coin">Current Price</th>
          <th class="table__coin">1h%</th>
          <th class="table__coin">Volume</th>
          <th class="table__coin">Market Cap</th>
        </tr>
      </thead>
      <!-- table data -->
      <tr v-for="coin in coins" :key="coin.name" class="table__row">
        <td class="table__coin table__coin--rank">
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
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const coins = ref([]);
    // api call function
    const getCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h"
        );
        coins.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getCoins();
    });
    return {
      coins,
    };
  },
};
</script>

<style src="./CryptoTable.scss" lang="scss"></style>
