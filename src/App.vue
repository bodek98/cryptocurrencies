<template>
  <TheHeader />
  <CryptoPrices />
</template>

<script>
import CryptoPrices from "./components/CryptoPrices/CryptoPrices.vue";
import TheHeader from "./components/Header/TheHeader.vue";

export default {
  name: "App",
  components: {
    CryptoPrices,
    TheHeader,
  },
};
</script>

<style>
:root {
  --primary-color: rgb(255, 255, 255);
  --bg-color: rgb(6, 17, 33);
  --border: 0.5px solid rgb(190, 190, 190);
  --font: rgb(236, 236, 236);
}
body {
  margin: 0;
  background-color: var(--bg-color);
}
#app {
  font-family: Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
