<template>
  <div class="mainContainer">
    <TheHeader />
    <ErrorMessage />
    <div class="layout">
      <div class="layout__chartAndFavs">
        <CryptoChart />
        <CryptoFav />
      </div>
      <div class="layout__allCryptoList">
        <CryptoTable />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/Header/TheHeader.vue";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.vue";
import CryptoChart from "./components/CryptoChart/CryptoChart.vue";
import CryptoFav from "./components/CryptoFav/CryptoFav.vue";
import CryptoTable from "./components/CryptoTable/CryptoTable.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    ErrorMessage,
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
