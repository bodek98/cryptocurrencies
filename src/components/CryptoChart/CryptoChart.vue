<template>
  <h2>ChartJS</h2>
  <div>
    <canvas id="cryptoChart" style="height: 300px"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { onMounted } from "vue";

export default {
  setup() {
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
                    prices: [{}],
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
