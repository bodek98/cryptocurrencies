<template>
  <div class="crypto">
    <table class="crypto__table">
      <!-- table head -->
      <thead>
        <tr class="crypto__coin">
          <th class="coin">Rank</th>
          <th class="coin">Current Price</th>
          <th class="coin">1h%</th>
          <th class="coin">Market Cap</th>
        </tr>
      </thead>
      <!-- table data -->
      <tr v-for="coin in coins" :key="coin.name" class="crypto__coin">
        <!-- coin parameters -->
        <td class="coin">{{ coin.market_cap_rank }}</td>
        <td class="coin coin__data">
          <img class="coin__logo" :src="coin.image" alt="coin logo" />
          <p>{{ coin.name }}</p>
          <p class="coin__symbol">{{ coin.symbol }}</p>
        </td>
        <td class="coin">{{ coin.current_price }}</td>
        <td class="coin">{{ coin.price_change_percentage_24h }}</td>
        <td class="coin">{{ coin.total_volume }}</td>
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

<style src="./CryptoPrices.scss" lang="scss"></style>
