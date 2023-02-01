<template>
  <div>
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

    onMounted(async () => {
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
        },
      });
    });
  },
};
</script>
