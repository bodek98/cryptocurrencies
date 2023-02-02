<template>
  <div class="mainContainer">
    <TheHeader />
    <div id="mainLayout">
      <div id="chartAndFavs">
        <CryptoChart />
        <CryptoFav />
      </div>
      <div id="allCryptoList">
        <CryptoTable />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/Header/TheHeader.vue";
import CryptoChart from "./components/CryptoChart/CryptoChart.vue";
import CryptoFav from "./components/CryptoFav/CryptoFav.vue";
import CryptoTable from "./components/CryptoTable/CryptoTable.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    CryptoChart,
    CryptoFav,
    CryptoTable,
  },
  setup() {
    return {};
  },
};
</script>

<style src="./App.scss" lang="scss"></style>
