<template>
  <div>
    <canvas id="cryptoChart" style="height: 300px"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    let favCoins = ref(store.state.favCoins);
    let price = ref([]);
    let time = ref([]);
    let dates = ref([]);

    const getPrices = async () => {
      const data = ref([]);
      try {
        await axios
          .get(
            "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly"
          )
          .then((res) => {
            data.value = res.data.prices;
            time.value = data.value.map((p) => p[0]);
            price.value = data.value.map((p) => p[1]);
          });
      } catch (error) {
        console.log(error);
      }
    };
    const timestampToDate = () => {
      time.value.forEach((timestamp) => {
        let date = new Date(timestamp);
        dates.value.push(date.getHours());
      });
    };

    onMounted(async () => {
      await getPrices();
      timestampToDate();
      const ctx = document.getElementById("cryptoChart");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: dates.value,
          datasets: [
            {
              label: "Bitcoin 24h prices",
              data: price.value,
              borderColor: "orange",
            },
          ],
        },
      });
    });
    return favCoins;
  },
};
</script>
