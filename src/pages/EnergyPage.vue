<template>
  <q-page>
    <q-splitter
      v-model="splitterModel"
      separator-class="bg-orange"
      separator-style="width: 3px"
      style="height: 90vh"
    >
      <template v-slot:before>
        <div style="display: flex">
          <div class="text-h4 q-mb-md">本日耗電</div>
          <div
            style="
              display: flex;
              justify-content: baseline;
              align-items: center;
            "
          >
            以100000kwh/日為基準
          </div>
        </div>
        <Pie :data="pieData" />
      </template>

      <template v-slot:after>
        <q-splitter
          v-model="insideModel"
          separator-class="bg-orange"
          separator-style="height: 3px"
          horizontal
        >
          <template v-slot:before>
            <Line :data="lineData" :options="lineOptions" />
          </template>

          <template v-slot:after>
            <Bar :data="barData" :options="barOptions" />
          </template>
        </q-splitter>
      </template>
    </q-splitter>
  </q-page>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'vue-chartjs';
import { usePageStore } from 'src/stores/store';
const splitterModel = ref(30);
const insideModel = ref(50);
const chartData = ref<{
  pie: Array<number>;
  line: Array<number>;
  bar: Array<number>;
}>({ pie: [], line: [], bar: [] });
const dataArray = {
  a: {
    pie: [80, 20],
    line: [5, 10, 25, 50, 66, 75, 80],
    bar: [65, 59, 80, 81],
  },
  b: {
    pie: [95, 5],
    line: [5, 20, 45, 60, 75, 85, 95],
    bar: [80, 85, 90, 86],
  },
  c: {
    pie: [60, 40],
    line: [5, 10, 15, 20, 36, 45, 60],
    bar: [50, 60, 55, 50],
  },
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);
const pieData = computed(() => {
  return {
    labels: ['已使用電量', '未使用電量'],
    datasets: [
      {
        label: '使用電量',
        data: chartData.value.pie,
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };
});
const lineData = computed(() => {
  return {
    labels: ['3', '6', '9', '12', '15', '18', '21', '24'],
    datasets: [
      {
        label: '本日耗電',
        backgroundColor: '#f87979',
        data: chartData.value.line,
        fill: false,
        tension: 0.1,
      },
    ],
  };
});
const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { max: 100 },
  },
};
const barData = computed(() => {
  return {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: '每月耗電',
        data: chartData.value.bar,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      },
    ],
  };
});

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { max: 100 },
  },
};
const store = usePageStore();
store.$subscribe(() => {
  switch (store.page) {
    case 'A棟大樓':
      chartData.value = dataArray.a;
      break;
    case 'B棟大樓':
      chartData.value = dataArray.b;
      break;
    case 'C棟大樓':
      chartData.value = dataArray.c;
      break;
    default:
      break;
  }
});
onMounted(() => {
  switch (store.page) {
    case 'A棟大樓':
      chartData.value = dataArray.a;
      break;
    case 'B棟大樓':
      chartData.value = dataArray.b;
      break;
    case 'C棟大樓':
      chartData.value = dataArray.c;
      break;
    default:
      break;
  }
});
</script>
