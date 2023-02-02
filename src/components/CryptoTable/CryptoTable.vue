<template>
  <div class="table">
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
        v-for="coin in $store.state.coins"
        :key="coin.name"
        class="table__row"
        :id="coin.id + '-row'"
        @click="addFavCoin(coin)"
      >
        <td class="table__coin--small table__coin--alignCenter">
          <span>
            <font-awesome-icon
              class="coin__star--regular"
              icon="fa-regular fa-star"
            />
            <font-awesome-icon
              class="coin__star--solid"
              icon="fa-solid fa-star"
            />
          </span>
        </td>
        <td class="table__coin table__coin--small table__coin--alignCenter">
          {{ coin.market_cap_rank }}
        </td>
        <td class="table__coin table__coin--data">
          <img class="table__coin--logo" :src="coin.image" alt="coin logo" />
          <p class="table__coin--alignStart">{{ coin.name }}</p>
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
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    // api call function
    const getCoins = () => {
      return store.dispatch("getCoins");
    };
    const addFavCoin = (coin) => {
      return store.dispatch("addChartData", coin);
    };

    getCoins();

    return {
      addFavCoin,
    };
  },
};
</script>

<style src="./CryptoTable.scss" lang="scss"></style>
