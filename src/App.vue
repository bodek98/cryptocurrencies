<template>
  <TheHeader />
  <CryptoTable v-if="isCryptoSelected" CryptoTable />
  <CryptoTable />
</template>

<script>
import CryptoTable from "./components/CryptoTable/CryptoTable.vue";
import TheHeader from "./components/Header/TheHeader.vue";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    CryptoTable,
    TheHeader,
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
  text-align: center;
}
</style>
