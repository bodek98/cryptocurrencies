<template>
  <div class="crypto">
    <p class="crypto__title">Today's Cryptocurrency Prices</p>
    <div class="crypto__box">
      <ol class="crypto__list">
        <li>BTC</li>
        <li>DOGECOIN</li>
        <li>ETHERIUM</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style src="./CryptoPrices.scss" lang="scss"></style>
