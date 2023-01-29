<template>
  <div class="mainContainer">
    <TheHeader />
    <CryptoChart />
    <CryptoFav />
    <CryptoTable />
  </div>
</template>

<script>
import CryptoFav from "./components/CryptoFav/CryptoFav.vue";
import CryptoTable from "./components/CryptoTable/CryptoTable.vue";
import TheHeader from "./components/Header/TheHeader.vue";
import CryptoChart from "./components/CryptoChart/CryptoChart.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    CryptoFav,
    CryptoTable,
    TheHeader,
    CryptoChart,
  },
  setup() {
    let isCryptoSelected = ref(false);
    return {
      isCryptoSelected,
    };
  },
};
</script>

<style>
:root {
  --primary-color: rgb(255, 255, 255);
  --bg-color: rgb(233, 234, 236);
  --border: 0.5px solid rgb(190, 190, 190);
  /* --font: rgb(236, 236, 236); */
}
body {
  margin: 0;
  background-color: var(--bg-color);
}
#app {
  font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 3rem;
}
</style>
