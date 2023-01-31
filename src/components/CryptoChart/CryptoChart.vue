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
      const ctx = document.getElementById("cryptoChart");
      chart = new Chart(ctx, {
        type: "line",
        label: "elo",
        data: {
          labels: store.state.chartLabels,
          datasets: store.state.chartDatasets,
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    });
  },
};
</script>
