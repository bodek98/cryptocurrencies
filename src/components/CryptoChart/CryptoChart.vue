<template>
  <div>
    <canvas id="cryptoChart" style="height: 300px"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    let chart;
    const store = useStore();
    const data = ref(store.state.favCoinPrices);
    let time = ref([]);
    let price = ref([]);
    let dates = ref([]);
    time.value = data.value.map((p) => p[0]);
    price.value = data.value.map((p) => p[1]);

    const timestampToDate = () => {
      time.value.forEach((timestamp) => {
        let date = new Date(timestamp);
        dates.value.push(date.getHours());
      });
    };

    const addData = async (value) => {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const newDataset = {
        label: "next",
        data: value,
        borderColor: "#" + randomColor,
      };
      chart.data.datasets.push(newDataset);
      chart.update();
    };
    const removeData = (value) => {
      chart.data.datasets.splice(value, 1);
      chart.update();
    };

    watch(
      () => store.state.favCoins.length,
      (newValue, oldValue) => {
        if (newValue > oldValue) {
          console.log(store.state.favCoinPrices);
          addData(store.state.favCoinPrices);
          console.log("add");
        } else if (newValue < oldValue) {
          removeData(store.state.favCoinPrices);
          console.log("remove");
        }
      }
    );

    timestampToDate();
    onMounted(async () => {
      const ctx = document.getElementById("cryptoChart");
      chart = new Chart(ctx, {
        type: "line",
        label: "elo",
        data: {
          labels: dates.value,
          datasets: [
            {
              label: "",
            },
          ],
        },
        options: {
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
