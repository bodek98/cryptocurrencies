<template>
  <h2>ChartJS</h2>
  <div>
    <canvas id="cryptoChart" style="height: 300px"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const coins = ref([]);
    const getPrices = async () => {
      try {
        const res = await axios.get(
          "hhttps://api.coingecko.com/api/v3/coins/" +
            +"/market_chart?vs_currency=usd&days=7"
        );
        coins.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };
    getPrices();

    onMounted(() => {
      const ctx = document.getElementById("cryptoChart");
      new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              data: {
                pricessets: [
                  {
                    prices: coins.value,
                  },
                ],
              },
            },
          ],
        },
      });
    });
  },
};
</script>
