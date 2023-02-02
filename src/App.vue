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

<style>
:root {
  --primary-color: rgb(8, 18, 28);
  --bg-color: rgb(18, 28, 42);
  --border: 0.5px solid rgb(190, 190, 190);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: var(--bg-color);
  color: rgb(255, 255, 255);
}

#app {
  font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.mainContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  row-gap: 3rem;
}

#mainLayout {
  width: max-content;
}
#mainLayout > * {
  margin: 8px;
}

/* Scale for super small devices */
@media only screen and (max-width: 740px) {
  html {
    font-size: 2vw;
  }
  #chartAndFavs,
  #allCryptoList {
    width: 90vw;
  }
}

/* Desktop */
@media only screen and (min-width: 1280px) {
  body {
    overflow: hidden;
  }
  .mainContainer {
    row-gap: 0;
  }
  #mainLayout {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    flex-wrap: nowrap;
  }
  #chartAndFavs,
  #allCryptoList {
    display: flex;
    flex-direction: column;
    width: 50vw;
    height: calc(100vh - 110px);
    max-height: calc(100vh - 110px);
  }
  #allCryptoList {
    margin-left: 0;
  }
}

/* Scrollbar styling */
/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
