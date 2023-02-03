<template>
  <div class="cryptoChartPanel">
    <canvas id="cryptoChart" style="height: 300px"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { onMounted, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    let chart;
    const store = useStore();

    watch(
      () => store.state.favCoins.length,
      () => {
        chart.data.labels = store.state.chartLabels;
        chart.update();
      }
    );

    const gridColor = "rgba(255,255,255,0.1)";

    onMounted(async () => {
      store.dispatch("updateFavCoins");

      const ctx = document.getElementById("cryptoChart").getContext("2d");
      chart = new Chart(ctx, {
        type: "line",
        label: "Cryptocurrencies chart",
        data: {
          labels: store.state.chartLabels,
          datasets: store.state.chartDatasets,
        },
        options: {
          elements: {
            point: {
              radius: 1,
            },
          },
          responsive: true,
          plugins: {
            filler: {
              propagate: true,
            },
          },
          scales: {
            y: {
              grid: {
                color: gridColor,
              },
            },
            x: {
              grid: {
                color: gridColor,
              },
            },
          },
        },
      });
      window.addEventListener("resize", () => {
        chart.resize();
      });
      chart.update();
    });
  },
};
</script>

<style src="./CryptoChart.scss" lang="scss"></style>
